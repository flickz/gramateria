export const exportTemplate = (data)=>{
    const {title,description,html} = data;
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title || ''}</title>
        <meta name="title" content="${title || ''}">
        <meta name="description" content="${description || ''}">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.0.2/materia/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.statically.io/gh/gramateria/readyui-free/main/css/style.min.css" />
    <body>
        ${html || ''}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js"></script>
        <!--  Readyui's (readyui.io) blocks --->
        <!--- generated by Gramateria -->
        </body>
    </html>`
}

