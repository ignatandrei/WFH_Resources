(async () => {
    try
     {
      await main();
      console.log("done");
    } 
    catch (e) 
    {
      console.log(e);
      console.log("Error" + JSON.stringify(e));
    }
  })();

async function main(){
    console.log('start');
    
}