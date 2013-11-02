<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="shelter_main">
    <title>Cats list</title>

</head>

<body>
<div ng-app="catShelter">
    <div ng-controller="CatsCtrl">
        <div>
            <table class="table-striped table-bordered">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Coat</th>
                    <th>Arrival date</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr ng-repeat="cat in cats">
                    <td>{{cat.id}}</td>
                    <td>{{cat.name}}</td>
                    <td>{{cat.breed.breedName}}</td>
                    <td>{{cat.coat.type}}</td>
                    <td>{{cat.arrivalDate}}</td>
                    <td><a href="${createLink(controller: 'cat', action: 'edit')}/{{cat.id}}" class="btn btn-info btn-large" ng-click="edit($index)">Edit</a></td>
                    <td><a href="#" class="btn btn-danger btn-large" ng-click="remove($index)">Delete</a></td>
                </tr>
            </table>
        </div>
        <a href="add" class="btn btn-success btn-large">Add a new cat</a>
        <a href="#" class="btn btn-info btn-large" ng-click="reloadData()">Refresh</a>
    </div>
</div>
</body>
</html>