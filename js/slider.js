var sliderObj = {
    sliderIndex: 1,
    pagesLength: document.getElementsByClassName("slide").length,
    nextSlide: function() {
        document.querySelector(".nextSlide").onclick = function () {
            if (sliderObj.sliderIndex < sliderObj.pagesLength) {
                sliderObj.sliderIndex++;
                sliderObj.sliderIndex = sliderObj.sliderIndex.toString();
                sliderObj.activeElements(sliderObj.sliderIndex);
                sliderObj.interval("clear");
            }
        }
    },
    previousSlide: function() {
        document.querySelector(".prevSlide").onclick = function () {
            if (sliderObj.sliderIndex > 1) {
                sliderObj.sliderIndex--;
                sliderObj.sliderIndex = sliderObj.sliderIndex.toString();
                sliderObj.activeElements(sliderObj.sliderIndex);
                sliderObj.interval("clear");
            }
        }
    },
    interval: function(clear) {
        /*** Sliders interval show ***/
        if (clear !== "clear") {
            intervalShow = setInterval(function(){
                if (sliderObj.sliderIndex < sliderObj.pagesLength) {
                    sliderObj.sliderIndex++;
                    sliderObj.sliderIndex = sliderObj.sliderIndex.toString();
                    sliderObj.activeElements(sliderObj.sliderIndex);
                } else {
                    sliderObj.sliderIndex = 1;
                    sliderObj.sliderIndex = sliderObj.sliderIndex.toString();
                    sliderObj.activeElements(sliderObj.sliderIndex);
                }
            }, 3500);
        } else {
            clearInterval(intervalShow);
            sliderObj.interval();
        }
    },
    activeElements: function(bulletId) {

        /*** Remove slide active class ***/
        var slidesArray = document.getElementsByClassName("slide");
        for(var i = 0; i < slidesArray.length; i++) {
            slidesArray[i].className = "slide";
        }

        /*** Remove bullet active class ***/
        var bulletsArray = document.getElementsByClassName("bullet");
        for(i = 0; i < bulletsArray.length; i++) {
            bulletsArray[i].className = "bullet";
        }

        /*** Get ID number ***/
        //if(!isNaN(bulletId)) {
            bulletId = bulletId.replace(/\D/g, '');
        //}

        /*** Add slide active class ***/
        var clickedPage = document.getElementsByClassName("slide")[bulletId-1];
        clickedPage.setAttribute("class", "active slide");


        /*** Add bullet active class ***/
        clickedPage = document.getElementsByClassName("bullet")[bulletId-1];
        clickedPage.setAttribute("class", "active bullet");

        /*** Hide/Show arrows ***/
        if (sliderObj.sliderIndex < sliderObj.pagesLength) {
            document.querySelector(".nextSlide").setAttribute("class", "controls nextSlide");
        }
        if (sliderObj.sliderIndex == sliderObj.pagesLength) {
            document.querySelector(".nextSlide").setAttribute("class", "controls nextSlide hide");
        }
        if (sliderObj.sliderIndex > 1) {
            document.querySelector(".prevSlide").setAttribute("class", "controls prevSlide");
        }
        if (sliderObj.sliderIndex == 1) {
            document.querySelector(".prevSlide").setAttribute("class", "controls prevSlide hide");
        }
    },
    sliderPages: function(bulletId,sliderIndex) {
        document.querySelector(bulletId).onclick = function() {
            sliderObj.sliderIndex = sliderIndex
            sliderObj.activeElements(bulletId,sliderIndex);
            sliderObj.interval("clear");
        }
    },
    sliderInit: function () {

        /*** Generate pages buttons ***/
        for (var pageNum = 1; pageNum <= this.pagesLength; pageNum++) {
            var pageButton = document.createElement('button');
            if (pageNum === 1) {
                pageButton.setAttribute("class", "active bullet");
            } else {
                pageButton.setAttribute("class", "bullet");
            }
            pageButton.setAttribute("id", "bullet_"+pageNum);
            document.querySelector(".slidesBullets").appendChild(pageButton);

            /*** Set bullet ID argument ***/
            this.sliderPages("#bullet_"+pageNum,pageNum)
        }
        this.nextSlide();
        this.previousSlide();
        this.interval();
    }
}
sliderObj.sliderInit();

