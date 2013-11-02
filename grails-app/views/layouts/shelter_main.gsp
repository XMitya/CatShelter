<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
  <title><g:layoutTitle default="Cat Shelter"/></title>
    <r:require modules="bootstrap"/>
    <r:require modules="angular"/>

    <r:layoutResources/>
    <g:layoutHead/>

</head>
<body>
    <g:render template="/common/header"/>
    <g:layoutBody/>
    <g:javascript library="application"/>

    <r:layoutResources/>
    <div class="navbar navbar-fixed-bottom">
        <g:render template="/common/footer"/>
    </div>
    <g:javascript src="catshelter.js"/>

</body>
</html>