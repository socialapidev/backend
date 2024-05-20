const layout2 = `<html>
   <style>
      * {
         box-sizing: border-box;
         margin: 0;
         padding: 0;
      }
      
      body {
         width: 2000px;
         height: 2000px;
      }
      
      .container {
         position: relative;
         display: flex;
         width: 2000px;
         height: 2000px;
         background-color: {{ secondaryColor }};
         min-width: 0;
         color: #fff;
         font-family: "Helvetica"
      }
      
      .wrapper {
         width: 100%;
         height: 100%;
         display: flex;
         flex-direction: column;
         padding: 10%;
         align-items: center;
         justify-content: center;
         text-align: center;
      }
      
      .text {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         text-align: center;
         gap: 3vw;
      }
      
      .website {
         position: absolute;
         bottom: 6%;
         left: 0;
         right: 0;
         width: 100%;
      }
      
      .wrapper h1 {
         font-size: 6vw;
      }
      
      .wrapper h4,
      .wrapper h5 {
         font-size: 2.5vw;
      }
      
   </style>
   <body>
      <div class="container">
         <div class="wrapper">
            <div class="text">
               <h1>{{ title }}</h1>
               <h4>{{ caption }}<h4>
            </div>
            <div class="website">
               <h5>{{ url }}</h5>
            </div>
         </div>
      </div>
   </body>
</html>`

module.exports = {
   layout2
}