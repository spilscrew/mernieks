var smoothScroll = {
    links: [],
    heightArray: [],
    destinationHeight: function () {
        this.heightArray = [];
        for(var y=0; y<this.links.length; y++) {
            var destinationId = document.querySelector("a[href='"+this.links[y]+"']").hash.substring(1);
            var destinationHeight = document.getElementById(destinationId);
            this.heightArray.push(destinationHeight.offsetTop);
        }
    },
    clickOnLink: function(num) {
        var that = this;
        document.querySelector("a[href='"+this.links[num]+"']").onclick = function () {
            this.heightArray = [];
            that.destinationHeight();
            var px = 0;
            scrollInterval = setInterval(function(){
                if (px < that.heightArray[num]) {
                    window.scrollTo(0, px);
                    px+=50;
                } else {
                    clearInterval(scrollInterval);
                    window.scrollTo(0, that.heightArray[num]);
                }
            }, 15);

            return false;
        }
    },
    smoothScrollInit: function() {
        var linkDestination = document.getElementsByClassName("smoothScrollLink");
        for (var i=0; i<linkDestination.length; i++) {
            this.links.push(linkDestination[i].hash)
            this.clickOnLink(i);
        }
        this.destinationHeight();
    }
};
smoothScroll.smoothScrollInit();