
   <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
     <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>
<script src="https://cdn.datatables.net/rowgroup/1.1.1/js/dataTables.rowGroup.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>

<script>
    $(document).ready( function () {
      //window.alert('tst');
      $('#tbData').DataTable(
        {
          paging: false,
          responsive: true,
          order: [
              [1, 'asc'],
              [2, 'asc'],
              [3, 'asc']  
                ],
        rowGroup: {
            dataSrc: 1
        }
        }
      );
      } );</script>