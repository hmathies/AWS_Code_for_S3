<!DOCTYPE html>
<html lang="en">
<head>
 
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=0.85">
 
    <title>InfluentMetrics Dashboard</title>
 
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css">




    <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
 
    <style>
    .text-align-center{
        text-align:center;
    }
 
    .margin-zero{
        margin:0;
    }
 
    .overflow-hidden{
        overflow:hidden;
    }
 
    .margin-bottom-1em{
        margin-bottom:1em;
    }
 
    .m-r-1em{
        margin-right:1em;
    }

    .glyphicon-spin {
      -animation: spin .7s infinite linear;
      -webkit-animation: spin2 .7s infinite linear;
    }
    @-webkit-keyframes spin2 {
      from { -webkit-transform: rotate(0deg);}
      to { -webkit-transform: rotate(360deg);}
    }
    @keyframes spin {
      from { transform: scale(1) rotate(0deg);}
      to { transform: scale(1) rotate(360deg);}
    }
    </style>
    <link rel="shortcut icon" href="/favicon.ico">
 
</head>
<body class="nav-md">
 
    <!-- container -->
    <div class="container body">
 
        <div id="content" class="main_container">
            <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); ">
              <h1><span class="glyphicon glyphicon-refresh glyphicon-spin"></span> Loading...</h1>
            </div>
        </div>
 
<!-- jQuery library -->
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<script src="/ui/js/Flot/jquery.flot.js"></script>
<script src="/ui/js/Flot/jquery.flot.time.js"></script>
<script src="/ui/js/Flot/jquery.flot.spline.js"></script>

<!-- main react components -->
<?php
$p = ($_GET['p']) ? $_GET['p'] : 'personalizer';
$port = array( "personalizer" => 443, "importer" => 8080 );

if ($_GET['dev']) {
  // dev server bundle
  echo '<link rel="stylesheet" href="ui/components/' . $p . '/custom.css" />';
  echo '<script src="http://localhost:' . $port[$p] . '/assets/app.js"></script>';
} else {
    echo '<script src="/ui/build-' . $p . '/app.js"></script>';
}
?>

<!-- jQuery plugins -->
<!--
<script src="//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js"></script>
-->

<!-- bootstrap JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<div class="footer_title hidden"><a href="https://influentmetrics.com/" class="site_title"><span><img src="/logo.png" alt="Influent Metrics" style="max-width: 200px;"></span></a></div>

    </div>
    <!-- /container -->
 
</body>
</html>
