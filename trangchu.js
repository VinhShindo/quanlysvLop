var soureAPI = 'http://localhost:3000/Students';

getMember();

function getMember(callback) {
    fetch(soureAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var number1 = 0, number2 = 0, number3 = 0;
            data.map((list) => {
                if (list.status.toUpperCase() == "ĐANG THEO HỌC") {
                    number1++;
                } else if (list.status.toUpperCase() == "BẢO LƯU") {
                    number2++;
                } else if (list.status.toUpperCase() == "THÔI HỌC") {
                    number3++;
                }
            })
            document.getElementById('number-1').textContent = number1;
            document.getElementById('number-2').textContent = number2;
            document.getElementById('number-3').textContent = number3;
        });
}

$(document).ready(function () {
    $(".fa-bars").click(function () {
        $("span.hide-text").toggle("slow")
    });
    $(".block").hover(function(){
        $(".fa-graduation-cap, .fa-layer-group, .fa-users-rays").animate({ fontSize: "3.3em" }, "slow");
    }, function(){
        $(".fa-graduation-cap, .fa-layer-group, .fa-users-rays").animate({ fontSize: "2em" }, "slow");
    });
});