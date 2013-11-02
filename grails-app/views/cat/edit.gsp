<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="shelter_main">
    <title>
        <g:if test="${flash.titleAction == 'adding'}">
            Adding a new cat
        </g:if>
        <g:elseif test="${flash.titleAction == 'editing'}">
            Editing existed cat
        </g:elseif>
        <g:else>
            Custom action
        </g:else>
    </title>
</head>

<body>
<div ng-app="catShelter">
        <form class="form-horizontal">
            <fieldset ng-controller="CatEditAddCtrl">
                <legend>Put your cat details</legend>

                <div class="form-group row">
                    <label class="col-lg-1 control-label" for="catId">Cat ID</label>

                    <div class="col-lg-2">
                        <input type="text" id="catId" class="form-control" ng-model="cat.id"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-lg-1 control-label" for="catName">Cat name</label>

                    <div class="col-lg-2">
                        <input type="text" id="catName"  class="form-control"  ng-model="cat.name"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-lg-1 control-label" for="coat">Coat</label>

                    <div class="col-lg-2">
                        <select class="form-control" id="coat" ng-model="cat.coat" ng-options="c.type for c in coats">
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-lg-1 control-label" for="breed">Breed</label>

                    <div class="col-lg-2">
                        <input type="text" id="breed"  class="form-control" ng-model="cat.breed.breedName" ng-change="cat.breed.id=null"/>
                        <select class="form-control" id="breedSelector" ng-model="cat.breed" ng-options="b.breedName for b in breeds">
                        </select>
                    </div>
                </div>

                <div class="form-group row">
                    <a href="${createLink(controller: 'cat', action: 'list')}" class="btn btn-info btn-large">Go back to the list</a>
                    <div class="col-lg-2">
                        <a href="#" class="btn btn-success btn-large" ng-click="save();">Save!</a>
                    </div>
                </div>
            </fieldset>
        </form>

    </div>
</body>
</html>