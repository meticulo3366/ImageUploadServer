

var app = app || {};

app.usr_flag= false;


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
      var isUserLoggedIn = new app.UserLoggedIn();
      isUserLoggedIn.fetch({
        success:function(ev){
          alert('success:'+isUserLoggedIn.toJSON().message);
          console.log('success'+isUserLoggedIn.toJSON().message);
          if(isUserLoggedIn.toJSON().message){
            app.userEmail= isUserLoggedIn.toJSON().user.email; 
            app.uid= isUserLoggedIn.toJSON().user.id; 
            app.contact= isUserLoggedIn.toJSON().user.contactNumber;
            app.usr_flag= true;

            var navbarView= new app.NavbarView();
            navbarView.render();
            
          }
          else{
            var fullnavbarView= new app.FullNavbarView();
            fullnavbarView.render();
          }
          
          that.$el.html( that.tpl());

        },
        error: function(){
          alert('error');
        }
       
      });    
      var fullnavbarView= new app.FullNavbarView();
      fullnavbarView.render();
      that.$el.html( that.tpl());
    },
    storeQueryAndNavigate:function(){
      var taht=this;
      var query=document.getElementById('#comsumerQuery').value;
      //alert(query);
      window.localStorage.setItem("searchItem", query);
      app.qr= $('#comsumerQuery').val();
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
          var query=$('#comsumerQuery').val();
          console.log('selected text'+ui.item.value);
          window.localStorage.setItem("searchItem", ui.item.value); 
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
            //console.log('in login f of Backbone');
          var loginDetails = $(ev.currentTarget).serializeObject();
          var userLogin = new app.UserLogin();
          userLogin.save(loginDetails, {
            success: function(user){
             
             
              console.log('in login success')
              if(user.attributes.role === 'admin') {
               
                //app.router.navigate('adminDashboard', {trigger: true});
                window.location = '/admin';
              } else {
                app.router.navigate('/', {trigger: true});                             

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
          var query=localStorage.getItem("searchItem");
          //alert(app.qr);
          //alert(query);
          if(app.usr_flag){
            var navbarView =new app.NavbarView();
            navbarView.render();

          }
          else{
            var fullnavbarView = new app.FullNavbarView();
            fullnavbarView.render();
          }
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
          localStorage.setItem("searchItem", query);
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

      var search=localStorage.getItem("searchItem");
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
          if(app.usr_flag){
            alert('true');
            var navbarView =new app.NavbarView();
            navbarView.render();

          }
          else{
            alert('false');

            var fullnavbarView = new app.FullNavbarView();
            fullnavbarView.render();
          }

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
          'click .continueOrder': 'continueOrder',
          'submit .login-user-form': 'login',
          'submit .create-user-form': 'createUser'
        },

        initialize: function() {
          app.View=this;
           
        },
        render: function () {
          console.log('in OrderProcessView render:');
          var that = this;

          if(app.usr_flag){
            var navbarView =new app.NavbarView();
            navbarView.render();
            alert('true');
          }
          else{
            alert('false');
            var fullnavbarView = new app.FullNavbarView();
            fullnavbarView.render();
          }
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
              //if(app.View){app.View.close();}
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
          if(app.usr_flag){
            var that = this;
            $('.delivey-contact').val(app.contact);
            //ev.currentTarget.placeOrder();
            //that.placeOrder();
            $("#btn-continue-order").hide();
                $("#btn-place-order").show();
                $('.d-addr-data').show();
                $('.d-addr-head').show();
                $('.action').hide();
                $('.contact_no').show();
          }else{
            console.log('in continueOrder function');  
            $('#modal-placeorder').modal('show');
           //return false;  
          }       
        },

        login: function(ev){

          console.log('login function called');
         
            var loginDetails = $(ev.currentTarget).serializeObject();
            var loginUser = new app.UserLogin();

            console.log(loginDetails);
            window.localStorage.setItem('user_id', null);

            loginUser.save(loginDetails, {
              success: function(user){

                console.log('Login Success!');
                 $('.delivey-contact').val(user.attributes.contactNumber);
                $('#modal-placeorder').hide();
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                app.usr_flag= true;
                app.uid= user.attributes._id;
                app.userEmail= user.attributes.email;

                // window.localStorage.setItem('user_id', user.attributes._id);
                // window.localStorage.setItem('userName', user.attributes.name.first+' '+user.attributes.name.last);

                // if(user.attributes.role === 'consumer') {
                //   var fullnavbarView = new app.FullNavbarView();
                //   fullnavbarView.render();
                //  //alert('yes'+app.userName);                                
                // }
                var navbarView= new app.NavbarView();
                navbarView.render();
                $('.delivey-contact').val(user.attributes.contactNumber);
                $("#btn-continue-order").hide();
                $("#btn-place-order").show();
                $('.d-addr-data').show();
                $('.d-addr-head').show();
                $('.action').hide();
                $('.contact_no').show();
                new app.OrderProcessView();
                this.render();                              
              },
              error: function (model, response) {
                alert('login failded');
                if(_.isString(response.responseJSON.error)) {
                  document.getElementById('error-message').innerHTML = response.responseJSON.error;
                }              
              }
          });

          return false;
        },

        createUser: function(ev){
          console.log('at createUser function');
          var userInfo = $(ev.currentTarget).serializeObject();
          var user = new app.User();
          user.save(userInfo, {
            success: function(user){
              console.log('createUser success');
              console.log(user.attributes.email);
              console.log(user.attributes.password);
              var login_User = new app.UserLogin();
              window.localStorage.setItem('user_id', null);

              login_User.save({email:user.attributes.email,password:user.attributes.password}, {
                success: function(user){

                  console.log('logged in');

                  $('#modal-placeorder').hide();
                  $('body').removeClass('modal-open');
                  $('.modal-backdrop').remove();
                  app.usr_flag= true;
                  app.uid= user.attributes._id;
                  app.userEmail= user.attributes.email;
                  // window.localStorage.setItem('user_id', user.attributes._id);
                  // window.localStorage.setItem('userName', user.attributes.name.first+' '+user.attributes.name.last);

                  var fullnavbarView= new app.FullNavbarView();
                  fullnavbarView.render();
                  $('.delivey-contact').val(user.attributes.contactNumber);
                  $("#btn-continue-order").hide();
                  $("#btn-place-order").show();
                  $('.d-addr-data').show();
                  $('.d-addr-head').show();
                  $('.action').hide();
                  $('.contact_no').show();                              
                },
                error: function (model, response) {
                  console.log('login failded');
                  if(_.isString(response.responseJSON.error)) {
                    document.getElementById('error-message').innerHTML = response.responseJSON.error;
                  }              
                }
              });
              return false;

              //app.router.navigate('signin',{trigger: true});
            },
            error: function (model, response) {
               console.log('error');
              //if(response.responseJSON.error.name === 'MongoError') {
                //document.getElementById('register-error-message').innerHTML = 'Email you entered is already registered with the application!';
              //}
            }
          });
          return false;

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
          app.contact= $('.delivey-contact').val();
          cart.save({updateDetails: updateDetails, contact:app.contact,userId:app.uid},{
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
                    app.router.navigate('/',{trigger:true});
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

app.getOrderView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('user-order-template').innerHTML
        ),
        events: {
        },

        initialize: function() {
        
        },
        render: function (options){
          //alert('yes');
          var that = this;
          var fullnavbar = new app.FullNavbarView();
          fullnavbar.render();
          $('#usr').show();
          $('#in').hide();
          $('#up').hide();
          console.log('id:'+options.id);
          that.$el.html( that.tpl());
        }
         
    });

    app.userAccountView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('profile-template').innerHTML
        ),
        events: {
          'submit .edit-user-basic-form': 'editBasicDetail',
          'submit .edit-user-password-form': 'editPasswordDetail'             
        },

        initialize: function() {
        
        },
        render: function (options){
          //alert('yes');
          var that = this;
          var fullnavbar = new app.FullNavbarView();
          fullnavbar.render();
          $('#usr').show();
          $('#in').hide();
          $('#up').hide();
          console.log('id:'+options.id);          

          var user1 = new app.User({id: options.id});        
         
          user1.fetch({
            success:function(){
              
              localStorage.setItem('hash',user1.toJSON().hash);

              that.$el.html( that.tpl({user:user1.toJSON()}));

            },
            error:function(){
              alert('error');
            }
          });       
          //console.log(this.user.toJSON());          
        },
        editBasicDetail: function(ev){
          alert('in editBasicDetail');
          var userInfo = $(ev.currentTarget).serializeObject();
          var userId= window.localStorage.getItem('user_id');
          var user = new app.User({id:userId});
          user.save(userInfo,{
            success:function(err,user){
              alert('in success');

            },
            error: function(){
              alert('in error');
            }

          });
          return false;
        },
        editPasswordDetail:function(ev){
          alert('editPasswordDetail');
          //var bcrypt = require('bcrypt-nodejs');

          var pswdDetail = $(ev.currentTarget).serializeObject();

          var change_pswd= new app.changePassword({id:window.localStorage.getItem('user_id')});
          change_pswd.save(pswdDetail, {
            success: function(user){
              alert('success');
              alert('new password:'+user.attributes.password);
              window.location.reload();

            },
            error:function(model,response){
              alert('error');
            }

          });
          return false;
        }         
    });              

app.FullNavbarView =Backbone.View.extend({
      el:'.navigation',
       tpl: Handlebars.compile(
          document.getElementById('full-navbar-template').innerHTML
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

app.NavbarView =Backbone.View.extend({
      el:'.navigation',
       tpl: Handlebars.compile(
          document.getElementById('navbar-template').innerHTML
        ),
        events: {
             'click .logout': 'logoutUser'
        },

        initialize: function() {
        
        },
        render: function () { 
          var that= this;
          console.log('usr_flag:'+app.usr_flag);

          if(app.usr_flag){
            console.log('userEmail:'+app.userEmail);
          }
          that.$el.html( that.tpl({userName: app.userEmail,uid:app.uid}));
        
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