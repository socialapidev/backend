const layout1 = `<html>
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
           }
           
           .sidebar {
              position: absolute;
              top: 0;
              left: 0;
              background-color: {{ secondaryColor }};
              height: 100%;
              width: 200px;
           }
           
           .main {
              position: absolute;
              width: 1800px;
              height: 100%;
              top: 0;
              left: 200px;
              background-color: rgba(0,0,0,0.7);
              z-index: 2;
           }
           
           .background {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 1800px;
              object-fit: cover;
              z-index: 1;
           }
          
           .content {
              display: flex;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 1800px;
              z-index: 2;
              flex-direction: column;
              padding: 3vw;
              justify-content: space-between;
              align-items: flex-start;
              background-color: rgba(0,0,0,0.6);
           }
           
           .text {
              display: flex;
              flex-direction: column;
              gap: 2vwpx;
              font-family: 'Helvetica';
           }
           
           .text h1 {
              color: white;
              font-size: 6.5vw;
           }
           
           .text h4 {
              color: {{ secondaryColor }};
              font-weight: 400;
              font-size: 2.5vw;
           }
           
           .logo img {
              height: 3.5vw;
              width: auto;
           }
           
        </style>
        <body>
           <div class="container">
              <div class="sidebar"/>
              <div class="main">
                 <img class="background" src="{{ backgroundUrl }}"/>
                 <div class="content">
                    <div class="logo">
                       <img src="{{ logoUrl }}"/>
                    </div>
                    <div class="text">
                       <h1>{{ title }}</h1>
                       <h4>{{ caption }}</h4>
                    </div>
                 </div>
              </div>
           </div>
        </body>
     </html>`


module.exports = {
   layout1
}