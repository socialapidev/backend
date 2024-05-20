const layout3 = `<html>
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
         align-items: center;
         justify-content: center;
         min-width: 0;
         padding: 10%;
         color: #fff;
         font-family: "Helvetica";
      }
      
      .wrapper {
         width: 100%;
         height: 100%;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         text-align: center;
      }
      
      .wrapper img {
         height: 100%;
         width: 100%;
         object-fit: cover;
      }
      
      .text {
         margin: auto;
         position: absolute;
         top: 0; left: 0; bottom: 0; right: 0;
         width: 80%;
         height: 80%;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         text-align: center;
         padding: 10%;
         gap: 2vw;
      }
      
      .text img {
         height: 4vw;
         width: auto;
      }
      
      .text h1 {
         background-color: rgba(0,0,0,0.35);
         padding: 5vw;
         font-size: 4vw;
      }
      
   </style>
   <body>
      <div class="container">
         <div class="wrapper">
            <img src="{{ backgroundUrl }}"/>
         </div>
         <div class="text">
            <img src="{{ logoUrl }}"/>
            <h1>{{ title }}</h1>
         </div>
      </div>
   </body>
</html>`

module.exports = {
    layout3
}