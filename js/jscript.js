const url = "https://api.rootnet.in/covid19-in/stats/latest";
let app = angular.module("CoronaStatus", []);

app.controller('CoronaCtrl', ($scope, $http) => {
    // this is contoller part
    $scope.title = "Stay Home Stay Safe";

    // change title on button click
    $scope.changeValue = () => {
        $scope.title = "You Clicked the Button!";
    }


    // calling covid wala api
    $http.get(url).then(
        (response) => {
            // SUCCESS
            console.log(response.data);
            $scope.summary = response.data.data.summary;
        },
        (error) => {
            // ERROR
            console.log(error);
        }
    );

    // Cases for given State
    $scope.getStateCases = () => {
        let state = $scope.stateName;
        $http.get(url).then(
            (response) => {
                // SUCCESS
                let regionalObj = response.data.data.regional;
                regionalObj.forEach((element)=>{
                    if(element.loc.match(state)){
                        $scope.statesObj = element;
                    }
                    else{
                        return;
                    }
                });

            },
            (error) => {
                // ERROR
                console.log(error);
            }
        );
    }

    // Counting Numbers Animation
    let values = document.querySelectorAll(".num");
    console.log(values);
    values.forEach((element) => {
        let startNum = 0,
            endNum = element.getAttribute('data-val'),
            //endNum = element.dataset.val, // Another way of retrieving value
            nSecond = 2,
            resolutionMS = 33,
            deltaNum = (endNum - startNum) / (1000 / resolutionMS) / nSecond;
        console.log(endNum);
        function countIni() {
            var handle = setInterval(() => {

                var x = startNum.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                element.innerHTML = x.toString();

                // if already updated the endNum, stop
                if (startNum >= endNum) clearInterval(handle);

                startNum += deltaNum;
                startNum = Math.min(startNum, endNum);
            }, resolutionMS);
        }
        countIni();
    });
});

