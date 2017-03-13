
var homeUrl = 'https://openapi.etsy.com/v2/listings/active.js'
var searchUrl = 'https://openapi.etsy.com/v2/listings/'
var apiKey = 't7976qdv2rwe9miv0zlja5e8'



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//MODELS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//2

var MultiCollection = Backbone.Collection.extend({
    url: homeUrl
    ,

    parse: function(apiResponse) {
        return apiResponse.results
    }
})



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//VIEWS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//3

var MultiView = Backbone.View.extend({ 
    initialize: function() {
        document.querySelector('.container').innerHTML = '<img src="im.gif">'
        this.listenTo(this.collection, 'sync', this.render) 
    },

    render: function() { 

        var containerNode = document.querySelector('.container')
        var htmlString = ''
        this.collection.forEach(function(inputModel) {
            
            htmlString += '<div class="product">'
            htmlString += '<div class="imagen">' + '<img class = "image" src="' + inputModel.get('Images')[0].url_170x135 + '">' + '</div>'
            htmlString += '<div class="link">'
            htmlString += '<a href="#details/">' + inputModel.get('category_path')[0] + '</a>'
            htmlString += '</div>'
            htmlString += '</div>'

            containerNode.innerHTML = htmlString
        })
    }
})


var DetailView = Backbone.View.extend({
    initialize: function() {
        document.querySelector('.container').innerHTML = '<img src="im.gif">'
        this.listenTo(this.model, 'sync', this.render)
    },

    render: function() {

        if(this.model.get('category_path')) {
            console.log('MMS')
        }

        
    }
})


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CONTROLLER
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//1

var EtsyRouter = Backbone.Router.extend({
    // define url routes
    routes: {
        "home": "showHomePage",
        "search/:query": "makeaSearch",
        "detail/:id": "showDetailProduct",
        "*default": "goHome"
    },

    showHomePage: function() {
        var homeInstance = new MultiCollection()
        homeInstance.fetch({ 
            dataType: 'jsonp',
            data: {
                includes: "Images,Shop",
                "api_key": apiKey
            }
        })
        new MultiView({
            collection: homeInstance
        })
    },

    makeaSearch: function(query) {
        var newSearch = new MultiCollection()
        newSearch.fetch({
            dataType: 'jsonp',
            data: {
                includes: "Images,Shop",
                "api_key": apiKey,
                keywords: query
            }
        })
        new MultiView({
            collection: newSearch
        })
    },

    showDetailProduct: function(detailObj){
        var detailProduct = new MultiCollection()
        detailProduct.fetch({
            dataType: 'jsonp',
            data: {
                includes: "Images,Shop",
                "api_key": apiKey
            }
        })
        new DetailView({
            collection: detailProduct
        })

    },

    goHome: function() {
        location.hash = 'home'
    }

})



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SEARCH
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//4

var searchNode = document.querySelector('.search')
searchNode.addEventListener('keydown', function(eventObj) {
        if (eventObj.keyCode === 13) {
            var input = eventObj.target.value 
            location.hash = 'search/' + input 
            eventObj.target.value = ''
        }
    })


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//START POINT 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

new EtsyRouter()

Backbone.history.start()





