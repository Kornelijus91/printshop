const popup = `
<!DOCTYPE html>
<html lang="lt">
  <head>
    <script>
        var pollTimer = window.setInterval(async function() {
            try {
                if (window.location.href.indexOf('/') !== -1) {
                    clearInterval(pollTimer);
                    // window.postMessage("test send", "*");
                    window.open('','_self').close()
                }
            } catch(e) {
                console.log(e);
            }
        }, 100);
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="popupBody"><p>Prisijungėte.</p></div>
  </body>
</html>
`
module.exports = popup