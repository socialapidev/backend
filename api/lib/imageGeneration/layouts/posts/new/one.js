const one = `<html>
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
            padding: 17.5vw;
        }

        .main img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .square {
            display: flex;
            height: 100%;
            width: 100%;
            background-color: {{ primaryColor }};
            align-items: center;
            justify-content: center;
            padding: 5vw;
            z-index: 2;
            font-family: 'Open Sans';
            font-size: 3vw;
            color: #fff;
        }

    </style>
    <body>
        <div class="main">
            <img src="{{ backgroundUrl }}" alt="">
            <div class="square">
                <h1>{{ title }}</h1>
            </div>
        </div>
    </body>
</html>`

module.exports = {
    one
}