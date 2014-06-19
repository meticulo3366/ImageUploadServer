var app = app || {};

(function () {
  'use strict';

  Backbone.View.prototype.close = function () {
    //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.$el.empty();
  };

  app.LandingView =Backbone.View.extend({
    el:'.page',
    tpl: Handlebars.compile(
      document.getElementById('landing-template').innerHTML
    ),
    events: {
      'click .consumerSearch' : 'storeQueryAndNavigate',
      'focus #comsumerQuery': 'getAutocomplete'
    },

    initialize: function() {
      this.dabbawala = new app.addTiffinBoxSupplier();
          this.listenTo( this.dabbawala, 'sync', this.render,this);
          this.dabbawala.fetch();
    },
    render: function () {
      var that = this;
      that.$el.html( that.tpl());
    },
    storeQueryAndNavigate:function(){
      var taht=this;
      var query=document.getElementById('comsumerQuery').value;
      localStorage.setItem("name", query);
      if($('#comsumerQuery').val()==""){
        //console.log('please inter');
        $('.landingErrorMsg').show();
        return false;
      }
        app.router.navigate('list', {trigger: true});
    },
    getAutocomplete:function(ev){
      var that = this;
      // this.dabbawala = new app.addTiffinBoxSupplier();
      //     this.listenTo( this.dabbawala, 'sync', this.render,this);
      //     this.dabbawala.fetch();
      // console.log('in getAutocomplete function'+this.dabbawala.toJSON().length);
      var searchArray = ['Veg','Nonveg','Lunch','Dinner','Breakfast','Daily','Monthly','Weekly','Hadapsar','Aundh','Dange chowk'];
      // console.log(this.dabbawala.length);
      // searchArray.push(this.dabbawala);
      $('#comsumerQuery').autocomplete({
        
        minLength: 1,
        source: searchArray,
        select: function (event, ui) {
          app.router.navigate('list', {trigger: true});

        }
        // error: function (event, ui) {
        // //error code here
        // }
      });
    }
  });
       
  app.CreateUserView =Backbone.View.extend({
    el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('create-user-template').innerHTML
        ),
        events: {
            'submit .create-user-form': 'saveUser'
        },

        initialize: function() {
        
        },
        render: function () {

          this.$el.html( this.tpl());
        },
         saveUser: function (ev) {
          var userDetails = $(ev.currentTarget).serializeObject();
          var user = new app.User();
          user.save(userDetails, {
            success: function(user){
              app.router.navigate('signin',{trigger: true});
            },
            error: function (model, response) {
              //if(response.responseJSON.error.name === 'MongoError') {
                //document.getElementById('register-error-message').innerHTML = 'Email you entered is already registered with the application!';
              //}
            }
          });
          return false;
        }

    });


app.SignInView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('login-user-template').innerHTML
        ),
        events: {
            'submit .login-user-form': 'login',
          'click #sign-in-with-fb': 'loginFb'
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        },
          login: function(ev) {
            console.log('in login f of Backbone');
          var loginDetails = $(ev.currentTarget).serializeObject();
          var userLogin = new app.UserLogin();
          userLogin.save(loginDetails, {
            success: function(user){
              window.localStorage.setItem('id', user.attributes._id);
               window.localStorage.setItem('userName', user.attributes.name.first+' '+user.attributes.name.last);
              console.log('in login success')
              if(user.attributes.role === 'admin') {
               
                //app.router.navigate('adminDashboard', {trigger: true});

                window.location = '/admin';
              } else {
                app.router.navigate('home', {trigger: true});  
              }
              
            },
            error: function (model, response) {
              if(_.isString(response.responseJSON.error)) {
                document.getElementById('error-message').innerHTML = response.responseJSON.error;
              }              
            }
          });
          return false;
        }

    });

 app.ForgotPasswordView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('forgotPassword-template').innerHTML
        ),
        events: {
             'submit .forgetPassword-user-form': 'saveUser'
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        },
         saveUser: function (ev) {
          var forgetPasswordDetails = $(ev.currentTarget).serializeObject();
          var userForgotPassword = new app.UserForgotPassword();
          userForgotPassword.save(forgetPasswordDetails, {
            success: function(){
              app.router.navigate('signin',{trigger: true});
            },
            error: function(model, response){
              if(_.isString(response.responseJSON.error)) {
                document.getElementById('forgot-password-error').innerHTML = response.responseJSON.error;
              }      
            }
          });
          return false;
        }

    });
       


app.HomepageView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('homepage-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });


app.ProfileView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('profile-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });

app.ListSupplierView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('list-template').innerHTML
        ),
        events: {
             'click .newSearch' :  'search',
             'submit .filer-search-form' : 'filterSearch',
             'click .viewMenu' : 'displayMenuList'
        },

        initialize: function() {
          app.View=this;
        },
        render: function () {
          var that = this;
          var query=localStorage.getItem("name");
          that.tiffinboxSupplier = new app.searchTiffinboxSupplier({query: query});
          that.tiffinboxSupplier.fetch({
            success: function(ev){
              //console.log(that.tiffinboxSupplier.toJSON());
              that.$el.html( that.tpl({tiffinSupplers:that.tiffinboxSupplier.toJSON()}));
            }          

          });
        },
        search:function(){
          console.log('In New Search');

          var query=document.getElementById('newComsumerQuery').value;
          localStorage.setItem("name", query);
         //app.router.navigate('list', {trigger: true});
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
         new app.ListSupplierView();
         this.render();

        },
        filterSearch : function(ev){
          var that=this
          app.View=this;
          var query=$(ev.currentTarget).serializeObject();

      var search=localStorage.getItem("name");
          var searchFilterResult = new app.SearchFilterResult(JSON.stringify(query),search);
          
            searchFilterResult.fetch({
              success: function(ev){
                console.log('success'+searchFilterResult.toJSON());
                //that.$el.html( that.tpl({tiffinSupplers:that.tbs.toJSON()}));
                that.$el.html( that.tpl({tiffinSupplers:searchFilterResult.toJSON()}));

              },
              error:function(a,s){
                console.log('in error');
              }
            });

          

           
            
         return false;
       },
       displayMenuList: function(ev){
        console.log('in displayMenuList fun');
        var query=[];
          $(".listOfSuppliers:checked").each(function() {
              query.push(this.value);
          });
          console.log(query);
          window.localStorage.setItem('selectedTs',query);
        app.router.navigate('checkout', {trigger: true});

       }
    });
      



  app.CheckoutView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('checkout-template').innerHTML
        ),
        events: {
             'click .addTocart': 'addTocart'
        },

        initialize: function() {
          app.View=this;
        
        },
        render: function () { 
          var that = this;

          console.log('in CheckoutView render:');

          var selectedTs = window.localStorage.getItem('selectedTs');
          console.log('selectedTs'+selectedTs)
        //var tiffinboxSuppliers = new app.checkoutTiffinboxSupplier({query: JSON.stringify(query)});
          var tiffinboxSuppliers = new app.GetMenuDate({menuDate: selectedTs});
          tiffinboxSuppliers.fetch({
            success: function(ev){
              console.log('in success:');
              console.log(tiffinboxSuppliers);
              that.$el.html( that.tpl({tiffinSupplers:tiffinboxSuppliers.toJSON()}));
            }          

          });
        },
        addTocart:function(ev){
         /* var data = $(ev.currentTarget).serializeObject();
          console.log(data);*/

          var that = this;
          console.log('in processorder function....');
          var query=[];
           var cart = new app.CartCollection();
          
           var orderDetails = [];

          $('.ckMenuId:checked').each(function() {
            var menuId=this.value;
            var dt=($(this).data('date')).split('/');
            console.log(dt);
            var date = new Date(dt[2],dt[1],dt[0]);
            console.log(date);
            var mealType= $(this).data('mealtype');
            var ts_id= $(this).data('tiffinsupplier');
            var price= $(this).data('price');
            console.log('-----------------------------'+price);

            orderDetails.push({tiffinboxSupplier: ts_id,menuId:menuId, date:date, mealAt:mealType,price:price});
          });

          console.log(orderDetails);

          cart.save({orderDetails: orderDetails}, {
            success: function(cart){
                  console.log(cart.toJSON()._id);
                  window.localStorage.setItem('cartId',cart.toJSON()._id);
                  window.localStorage.setItem('cart',cart.toJSON());
                 // $.session.set('cartid',cart.toJSON()._id)
                  //app.Session.cartId= cart.toJSON()._id;
                 // app.Session('cartId',cart.toJSON._id);
                  //query.push(cart.toJSON()._id);
                  //window.localStorage.setItem('query',query);
                  app.router.navigate('orderProcess',{trigger:true});
              },
              error: function(){
                console.log('error');
              }
          });

              // return false;
        },
                             
    });

   app.OrderProcessView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('order-detail-template').innerHTML
        ),
        events: {
          'click .btn-singlecartid': 'delteFromCart',
          'submit .cart-detail': 'placeOrder',          
          //'click .placeOrder' : 'placeOrder',
          'click .continueOrder': 'continueOrder'
        },

        initialize: function() {
          app.View=this;
           
        },
        render: function () {
          var that = this;
          console.log('in OrderProcessView render:');
          //console.log('cartid'+ $.session.get('cartid'));
          //var m = window.localStorage.getItem('cart');
          //console.log('cart'+m._id);
          var cartId= window.localStorage.getItem('cartId');
          var cart= new app.CartCollection({id:cartId});
          cart.fetch({
            success:function(ev){
              console.log('in OrderProcessView.render.success'+cart.toJSON());
              var data = cart.toJSON().orderDetails;
              app.total= 0;
              for (var i=0; i<data.length; i++){
                //alert(data[i].price);
                app.total= app.total + data[i].price;
              }
              app.item= i;
              //alert('total:'+app.total);
              //alert('item:'+app.item);
              that.$el.html( that.tpl({cartDetail: cart.toJSON(), total:app.total, item:app.item}));
            },
            error: function(){
              console.log('in error');
            }
          });
      
        },
        delteFromCart: function(ev){
          var that = this;
          var singlecartid= $(ev.currentTarget).data('singlecartid');
   // console.log($(ev.currentTarget).data('singlecartid'));
          // console.log(singlecartid);

          
          var cartId= window.localStorage.getItem('cartId');
          var cart = new app.CartCollection({id:cartId, singlecartid:singlecartid});
          cart.save({},{
            success: function(cart){
              console.log('in delteFromCart.sucess');
              window.localStorage.setItem('cartId',cart.toJSON()._id);
              console.log(cart.toJSON()._id);
            
              new app.OrderProcessView();
              that.render();          

            },
            error: function(model, response){
              console.log('in delteFromCart.error');
            }

          });   
            return false;   
        },
        continueOrder:function(ev){
          console.log('in continueOrder function');         
          //var updateDetail= $(ev.currentTarget).serializeObject();          
          // var contact,email;
          $('#modal-placeorder').modal('show');
           // $('body').removeClass('modal-open');
           // $('.modal-backdrop').remove();

           $('#result').click(function(ev){
            $('body').removeClass('modal-open');
             $('.modal-backdrop').remove();
            //alert($('#contact').val());
            //alert($('#email').val());
            app.contact = $('#contact').val();
            app.email= $('#email').val();
            $('#d-addr-head').show();
            $('.d-addr-data').show();
            $('#btn-continue-order').hide();
            $('#btn-place-order').show();
            //$('#btn-place-order').val("Place Order");
            //$( "p" ).removeClass( "continueOrder" ).addClass( "placeOrder" );
           }); 

           //return false;         
        },
        placeOrder:function(ev){
          console.log('in placeOrder function');
          //alert('placeOrder fun');
          var cartId= window.localStorage.getItem('cartId');
          var cart = new app.CartCollection({id:cartId});
          var updateDetails = [];
          $(ev.currentTarget).find('.deliveryaddress').each(function() {
            updateDetails.push({deliveryAddress: $(this).val(), dayId: $(this).attr('id')});
          });
          //alert('updateDetails');
          cart.save({updateDetails: updateDetails, contact:app.contact},{
            success:function(cart){
              console.log('in placeOrder success');

               // $('#modal-confirm-order').modal('show');
               $('#modal-conform-order').modal('show');
               // // $('body').removeClass('modal-open');
               // // $('.modal-backdrop').remove();
              $('#confirm').click(function(ev){
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                var order = new app.Order();
                order.save({order:cart}, {
                  success: function(order){
                    alert('order is confirmed');
                    console.log('order is success:'+order);
                  }
                  // error: function(model, response){
                  //   console.log('in order.save.error');
                  // }
                });
               });
            },
            error: function(model, response){
              console.log('in cart.save.error');
            }
          });
          //alert('end');
          return false;
        }
      });



app.NavbarView =Backbone.View.extend({
      el:'.navigation',
       tpl: Handlebars.compile(
          document.getElementById('navbar-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });

app.FullNavbarView =Backbone.View.extend({
      el:'.navigation',
       tpl: Handlebars.compile(
          document.getElementById('full-navbar-template').innerHTML
        ),
        events: {
             'click .logout': 'logoutUser'
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        },
        logoutUser: function() {
          var userLogout = new app.Logout();
            userLogout.fetch({
            success: function() {
              app.router.navigate('signin', {trigger: true
              });
            },
            error: function(model, response) {
         
            }
          });
          return false;
        }
         
    });






})();