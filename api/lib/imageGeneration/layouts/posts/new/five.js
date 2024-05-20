const five = `<html>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
<style>
    *  {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
       }

    body {
        width: 2000px;
        height: 2000px;
    }

    .main {
        display: flex;
        position: relative;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
        padding: 12.5vw;
        font-family: 'Open Sans';
    }

    .top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 45vh;
        background-color: {{ primaryColor }};
    }

    .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 55vh;
    }

    .wrapper {
        display: flex;
        width: 100vw;
        height: 45vh;
        padding: 8vh;
        align-items: center;
        justify-content: space-around;
    }

    .product {
        width: 40vw;
        height: 35vh;
        background-color: red;
    }

    .product img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .wrapper2 {
        display: flex;
        width: 100vw;
        height: 55vh;
        padding: 8vh;
        background-color: #FFF;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        gap: 3vh;
    }

    .wrapper2 h1 {
        color: {{ secondaryColor }};
        font-size: 6vh;
    }

    .wrapper2 h4 {
        font-size: 3vh;
        color: rgba(0,0,0,0.8);
        font-weight: 600;
    }


</style>
<body>
    <div class="main">
       <div class="top">
        <div class="wrapper">
            <div class="product one">
                <img src="{{ productOneUrl }}" alt="">
            </div>
            <div class="product two">
                <img src="{{ productTwoUrl }}" alt="">
            </div>
        </div>
       </div>
       <div class="bottom">
        <div class="wrapper2">
            <h1>{{ title }}</h1>
            <h4>{{ caption }}</h4>
        </div>
       </div>
    </div>
</body>
</html>`

module.exports = {
    five
}