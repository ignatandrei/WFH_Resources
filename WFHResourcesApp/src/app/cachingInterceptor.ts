import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, startWith } from 'rxjs/operators';

// start from https://github.com/angular/angular/blob/master/aio/content/examples/http/src/app/http-interceptors/caching-interceptor.ts
class SaveOnLocalStorage {
    public setWithExpiry(key: string, value: any, ttl: number) {
        const now = new Date();

        const item = {
              value,
              expiry: now.getTime() + ttl
          };

        localStorage.setItem(key, JSON.stringify(item));
      }
      public getWithExpiry(key: string): any {
        const itemStr = localStorage.getItem(key);
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }

}
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  static cache: Map<string, any> = new Map<string, any>();
  static saveData: SaveOnLocalStorage = new SaveOnLocalStorage();
  constructor() {
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // continue if not cachable.

    if (!this.isCachable(req)) { return next.handle(req); }
    // console.log(`start intercept ${req.url} ${this.isCachable(req)}`);
    let obsCache: HttpResponse<any> = null;
    if(!CachingInterceptor.cache.has(req.url)){
        const data= CachingInterceptor.saveData.getWithExpiry(req.url);
        if(data != null){
            CachingInterceptor.cache.set(req.url,data);
        }


    }
    if (CachingInterceptor.cache.has(req.url)) {
        console.log('exists in cache');
        const cachedResponse = CachingInterceptor.cache.get(req.url);
        obsCache =  new HttpResponse({ body: cachedResponse });
    }

    const duplicate = req.clone();
    console.log(`${req.url} exists in cache  ? ${CachingInterceptor.cache.has(req.url)}  ${obsCache != null}`);
    let sendDataAndCache$ = this.sendRequestAndCache(duplicate, next);
    if (obsCache != null) {
        return of(obsCache);
        sendDataAndCache$ = sendDataAndCache$.pipe(
           tap(e => {
               console.log(`from cache: ${req.url} `);
           }),
            startWith(obsCache)
           );
    }
    return sendDataAndCache$;

  }
  sendRequestAndCache(
    req: HttpRequest<any>,
    next: HttpHandler,
    ): Observable<HttpEvent<any>> {
      const url = req.url;
      return next.handle(req).pipe(
      tap(event => {
        // console.log(`in the tap for ${url} ${event instanceof HttpResponse}`);
        // There may be other events besides the response.
        if (event instanceof HttpResponse) {
          CachingInterceptor.cache.set(url, event.body); // Update the cache.
          // if (CachingInterceptor.cache.size % 2 === 0) {
          CachingInterceptor.saveData.setWithExpiry(url, event.body, 1000 * 60 * 60);
          // }
        }
      })
    );
  }
  isCachable(req: HttpRequest<any>): boolean {
    // Only GET requests are cachable
    return req.method === 'GET'; // &&
      // if you want to cache some urls
     // -1 < req.url.indexOf(searchUrl);
  }
}
