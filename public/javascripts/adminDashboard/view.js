var app = app || {};

(function () {
  'use strict';

  Backbone.View.prototype.close = function () {
    //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.$el.empty();
  };

  
app.addDabbawalaView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('add-dabbawala-template').innerHTML
        ),
        events: {
          'submit .create-dabbawala-form':'saveDabbawala'
             
        },

        initialize: function() {
        app.View = this;


        },
        render: function () {

          var that = this;
          that.$el.html( that.tpl());
         
          
        },
        saveDabbawala:function(ev){
          var dabbawalaDetails = $(ev.currentTarget).serializeObject();
//************************
          var dabbawala = new app.addTiffinBoxSupplier();

          dabbawala.save(dabbawalaDetails, {
            success: function(dbw){
              if(app.View)
               app.View.close();

        
              console.log('dabbawala saved:  '+dbw.name);
              app.router.navigate('adminDashboard',{trigger: true});
            },
            error: function(model, response){
              if(_.isString(response.responseJSON.error)) {
                
                //document.getElementById('forgot-password-error').innerHTML = response.responseJSON.error;
              }      
            }
          });
          return false;
        }
         
    });

app.AdminReportView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('admin-right-navbar-report-template').innerHTML
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



  
// app.NavbarView =Backbone.View.extend({
//       el:'.navigation',
//        tpl: Handlebars.compile(
//           document.getElementById('navbar-template').innerHTML
//         ),
//         events: {
             
//         },

//         initialize: function() {
        
//         },
//         render: function () {
//           var that = this;
//           that.$el.html( that.tpl());
//         }
         
//     });

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
              //app.router.navigate('signin', {trigger: true});
              window.location = '/users/user#signin';
            },
            error: function(model, response) {
         
            }
          });
          return false;
        }
         
    });


app.AddTeamView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('add-team-template').innerHTML
        ),
        events: {
             'submit .create-team-form':'saveTeam'
        },

        initialize: function() {
         app.View= this;

          this.dabbawala = new app.addTiffinBoxSupplier();
          this.listenTo( this.dabbawala, 'sync', this.render,this);
          this.dabbawala.fetch();

        },
        render: function () {
         
          var that = this;
          var dabbawalaName= window.localStorage.getItem('dabbawalaName');
                    that.$el.html( that.tpl({
          dabbawalaList: that.dabbawala.toJSON(),dabbawalaName:dabbawalaName

          }));
        },

        saveTeam:function(ev){
          console.log('in saveTeam');
          var menuDetails = $(ev.currentTarget).serializeObject();
         
          //var dabbawalaId = $('#dbw').val();
          var dabbawalaId = window.localStorage.getItem('dabbawalaId');
          console.log('dabbawalaId'+dabbawalaId)
          var team = new app.User({dabbawalaId: dabbawalaId});

          console.log(team);
         
          team.save(menuDetails, {
            success: function(){
                console.log(team);
                console.log(team.toJSON().email);
                console.log(team.toJSON().tiffinboxSupplier);
                window.localStorage.setItem('tiffinboxSupplierId', team.toJSON().tiffinboxSupplier);
                console.log(window.localStorage.getItem('tiffinboxSupplierId'));

                if(app.View)

                app.View.close();
              
                console.log('in saveTeam sucess');
                window.history.back();
                //app.router.navigate('teamList',{trigger: true});
            },
            error: function(model, response){
              console.log('in saveteam error');
              // if(_.isString(response.responseJSON.error)) {
                
              //   //document.getElementById('forgot-password-error').innerHTML = response.responseJSON.error;
              // }      
            }
          });
          return false;
        } 
         
    });

app.EditTeamView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('add-team-template').innerHTML
        ),
        events: {
             'submit .edit-team-form':'editTeam'
        },

        render: function (options) {
          var that=this;
          var userId = options.id;
          window.localStorage.setItem('userId',options.id);
          console.log('in editTeam render view'+options.id);
          //if(options.id){
            var dabbawalaId = window.localStorage.getItem('dabbawalaId');

            that.tiffinboxSupplier = new app.addTiffinBoxSupplier({id:dabbawalaId});
            that.tiffinboxSupplier.fetch({
              success: function (tiffinboxSupplier) { 
                console.log('in team edit fetch.success:'+ tiffinboxSupplier.toJSON().name);
                console.log(tiffinboxSupplier.toJSON().team.length);
                 window.localStorage.setItem('dabbawalaName', tiffinboxSupplier.attributes.name);
                 window.localStorage.setItem('dabbawalaId',tiffinboxSupplier.attributes.id);
                for (var i = 0; i < tiffinboxSupplier.toJSON().team.length; i++) {
                  if(tiffinboxSupplier.toJSON().team[i]._id === userId){
                    var team = tiffinboxSupplier.toJSON().team[i];
                    console.log('record matched');
                    console.log(tiffinboxSupplier.toJSON().team[i]);
                    break;
                  }
                };


                //console.log(window.localStorage.getItem('dabbawalaId'));   
                that.$el.html(that.tpl({team: team, dabbawalaName: window.localStorage.getItem('dabbawalaName')}));
              }
            })
          //}
        },

        editTeam:function(ev){
          console.log('in editTeam');
          var menuDetails = $(ev.currentTarget).serializeObject();
         
          //var dabbawalaId = $('#dbw').val();
          var userId = window.localStorage.getItem('userId');
          console.log('userId'+userId)
          var team = new app.User({userId: userId});

          console.log(team);
         
          team.save(menuDetails,{
            success: function(){
                console.log(team);
                console.log(team.toJSON());
                console.log(team.toJSON().tiffinboxSupplier);
                window.localStorage.setItem('tiffinboxSupplierId', team.toJSON().tiffinboxSupplier);
                console.log(window.localStorage.getItem('tiffinboxSupplierId'));

                if(app.View)

                app.View.close();
              
                console.log('in saveTeam sucess');
                window.history.back();
                //app.router.navigate('teamList',{trigger: true});
            },
            error: function(model, response){
              console.log('in saveteam error');
              // if(_.isString(response.responseJSON.error)) {
                
              //   //document.getElementById('forgot-password-error').innerHTML = response.responseJSON.error;
              // }      
            }
          });
          return false;
        } 
         
    });

app.DeleteTeamView= Backbone.View.extend({
  render: function (options) {
    console.log('in DeleteTeamView'+options.id);
    var that = this;
    var userId = options.id;
    console.log(userId);
    if(userId){
      console.log(userId);
      that.user = new app.User({id: userId});
      that.user.destroy({
        success: function (user){
          console.log(user);
          console.log('in DeleteteamView success'+userId);
          window.history.back();
          //app.router.navigate('edit', {trigger:true});
        }
      });
      return false;
    }
  }    
}); 
app.AddMenuView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('add-menu-template').innerHTML
        ),
        events: {
            'submit .create-menu-form':'saveMenu'  
        },

        initialize: function(){
         app.View= this;

          this.dabbawala = new app.addTiffinBoxSupplier();
          this.listenTo( this.dabbawala, 'sync', this.render,this);
          this.dabbawala.fetch();

        },
        render: function () {
  
          var that = this;
          var dabbawalaName= window.localStorage.getItem('dabbawalaName')
          ,mealType= window.localStorage.getItem('mealtype')
          ,category= window.localStorage.getItem('category');
          
          

          console.log(typeof category);

          that.$el.html( that.tpl({dabbawalaList: that.dabbawala.toJSON()
                                  ,dabbawalaName: dabbawalaName
                                  ,category:category.split(',')
                                  ,mealType:mealType.split(',')}));
        },
        saveMenu:function(ev){
          console.log('in saveMenu');
          var menuDetails = $(ev.currentTarget).serializeObject();
          var dabbawalaId = window.localStorage.getItem('dabbawalaId');
          console.log('savemenu dabbawalaId: '+dabbawalaId);

          var menu = new app.addTiffinBoxSupplierMenu({dabbawalaId : dabbawalaId});
          menu.save(menuDetails, {
            success: function(){
              if(app.View)
              app.View.close();
              window.localStorage.setItem('tiffinboxSupplierId', menu.toJSON()._id);

              console.log('in saveMenu sucess');
              window.location.reload();
              //window.history.back();
              //app.router.navigate('menuList',{trigger: true});
            },
            error: function(model, response){
              console.log('in savemenu error');
            }
          });
          return false;
        } 
    });

app.EditMenuView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('add-menu-template').innerHTML
        ),
        events: {
            'submit .edit-menu-form':'editMenu'  
        },

        render: function (options) {
          var that=this;
          var menuId = options.id;
          window.localStorage.setItem('menuId',menuId);
          console.log('in editMenu render view');
          //if(options.id){
            var dabbawalaId = window.localStorage.getItem('dabbawalaId');

            that.tiffinboxSupplier = new app.addTiffinBoxSupplier({id:dabbawalaId});
            that.tiffinboxSupplier.fetch({
              success: function (tiffinboxSupplier) { 
                console.log('in menu edit fetch.success:'+ tiffinboxSupplier.toJSON().name);
                for (var i = 0; i < tiffinboxSupplier.toJSON().menu.length; i++) {
                  if(tiffinboxSupplier.toJSON().menu[i]._id === menuId){
                    var menu = tiffinboxSupplier.toJSON().menu[i];
                    console.log('record matched');
                    console.log(tiffinboxSupplier.toJSON().menu[i]);
                    break;
                  }
                };
                 var dabbawalaName= window.localStorage.getItem('dabbawalaName')
                  ,mealType= window.localStorage.getItem('mealtype')
                  ,category= window.localStorage.getItem('category');

                //console.log(window.localStorage.getItem('dabbawalaId'));   
                that.$el.html(that.tpl({menu: menu
                  ,dabbawalaName: dabbawalaName
                  ,category:category.split(',')
                  ,mealType:mealType.split(',')}));
              }
            })
          //}
        },
        editMenu:function(ev){
          console.log('in editMenu');
          var menuDetails = $(ev.currentTarget).serializeObject();
          var dabbawalaId = window.localStorage.getItem('dabbawalaId');
          var menu = new app.addTiffinBoxSupplierMenu({dabbawalaId : dabbawalaId, menuId : window.localStorage.getItem('menuId')});
          menu.save(menuDetails, {
            success: function(){
              if(app.View)
              app.View.close();
              window.localStorage.setItem('tiffinboxSupplierId', menu.toJSON()._id);

              console.log('in saveMenu sucess');
              window.history.back();
              //window.location.reload();
              //app.router.navigate('menuList',{trigger: true});
            },
            error: function(model, response){
              console.log('in savemenu error');
            }
          });
          return false;
        } 
    });

app.DeleteMenuView= Backbone.View.extend({
  render: function (options) {
    console.log('in DeleteMenuView'+options.id);
    var that = this;
    var menuId = options.id;
    var dabbawalaId = window.localStorage.getItem('dabbawalaId');
    console.log('dabbawalaId: '+dabbawalaId);
    console.log('menuId:'+menuId);
    if(menuId){
      var menu = new app.addTiffinBoxSupplierMenu({dabbawalaId : dabbawalaId, menuId : menuId});
      menu.save({},{
        success: function (menu){
          console.log(menu);
          console.log('in DeleteMenuView success');
          window.history.back();
          //app.router.navigate('edit', {trigger:true});
        }
      });
      return false;
    }
  }        
}); 
app.AdminNavbarView =Backbone.View.extend({
      el:'.admin-navbar',
       tpl: Handlebars.compile(
          document.getElementById('admin-navbar-template').innerHTML
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



app.AdminDashboardView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('admin-dashboard-template').innerHTML
        ),
        events: {
             'click .search': 'searchResult'
        },

        initialize: function() {
          app.View= this;
          var userName= window.localStorage.getItem('userName');
          console.log("admin:"+userName);
          this.dabbawala = new app.addTiffinBoxSupplier();
          this.listenTo( this.dabbawala, 'sync', this.render,this);
          this.dabbawala.fetch();
        
        },
        render: function () {
          var that = this;
          var userName= window.localStorage.getItem('userName');
          that.$el.html( that.tpl({dabbawalaList: that.dabbawala.toJSON(),userName: userName}));

        },

        searchResult: function(ev){
          var query = $('#searchKey').val();
          console.log('in searchList initialize '+query);
          this.tiffinboxSupplier = new app.searchTiffinboxSupplier({query: query});
          //console.log(this.tiffinboxSupplier);
          var that= this;
          that.tiffinboxSupplier.fetch({
            success: function(ev){
              //console.log('*****************tiff supp :');
              console.log(that.tiffinboxSupplier);
              console.log(that.tiffinboxSupplier.models.length);
              
              var content= "";
    
              for (var i=0;i<that.tiffinboxSupplier.models.length;i++){
                content+='<tr><td class="active">'+that.tiffinboxSupplier.models[i].get('name')+'</td><td class="active">'+that.tiffinboxSupplier.models[i].get('address').vicinity+','+that.tiffinboxSupplier.models[i].get('address').city+','+that.tiffinboxSupplier.models[i].get('address').zipCode+'</td><td class="active">'+that.tiffinboxSupplier.models[i].get('distributionAreas')+'</td><td class="active"><a href="#edit/'+that.tiffinboxSupplier.models[i].get('_id')+'" class="btn btn-primary" id="">Edit</a><a href="#delete/'+that.tiffinboxSupplier.models[i].get('_id')+'" class="btn btn-danger" id="">Delete</a></td></tr>';
              }
                  $('.afterSearhTable').html(content);
                  $('.startTable').hide();
                  $('.newTable').show();
            }
          });
         
          return false;   
        
        }

        
    });

app.TeamListView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('team-list-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
          app.View= this;

          var id = window.localStorage.getItem('tiffinboxSupplierId');
          this.tiffinboxSupplier = new app.addTiffinBoxSupplier({id: id});
          this.listenTo( this.tiffinboxSupplier, 'sync', this.render,this);
          this.tiffinboxSupplier.fetch();

        
        },
        render: function () {
         
          var that = this;
          that.$el.html( that.tpl({tiffinboxSupplier: this.tiffinboxSupplier.toJSON()}));

        }
         
    });

app.MenuListView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('menu-list-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
          app.View= this;

          var id = window.localStorage.getItem('tiffinboxSupplierId');
          console.log('in menuList initialize '+id);
          this.tiffinboxSupplier = new app.addTiffinBoxSupplier({id: id});
          console.log(this.tiffinboxSupplier);
          this.listenTo( this.tiffinboxSupplier, 'sync', this.render,this);
          this.tiffinboxSupplier.fetch();

        
        },
        render: function () {        
          var that = this;
          console.log();
          that.$el.html( that.tpl({tiffinboxSupplier: this.tiffinboxSupplier.toJSON()}));

        }
         
    });

app.SearchListView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('search-dabbawala-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
          app.View= this;

          var query = $('#searchKey').val();
          console.log('in searchList initialize '+query);
          this.tiffinboxSupplier = new app.searchTiffinboxSupplier({query: query});
          console.log(this.tiffinboxSupplier);
          this.listenTo( this.tiffinboxSupplier, 'sync', this.render,this);
          this.tiffinboxSupplier.fetch();

        
        },
        render: function () {
          console.log("In render: " + this.tiffinboxSupplier.toJSON());
          var that = this;
          that.$el.html( that.tpl({dabbawalaList: this.tiffinboxSupplier.toJSON()}));

        }
         
    });




app.AdminRightNavbarDabbawalaView =Backbone.View.extend({
      el:'.admin-right-navbar',
       tpl: Handlebars.compile(
          document.getElementById('admin-right-navbar-dabbawala-template').innerHTML
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

app.AdminRightNavbarReportView =Backbone.View.extend({
      el:'.admin-right-navbar',
       tpl: Handlebars.compile(
          document.getElementById('admin-right-navbar-report-template').innerHTML
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

    app.DeleteDabbawalaView= Backbone.View.extend({
        el: '.admin-content',
        render: function (options) {
          console.log('in DeleteDabbawalaView'+options.id);
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          var that = this;
          if(options.id){
            var id = options.id;
            that.tiffinboxSupplier = new app.addTiffinBoxSupplier({id:id});
            that.tiffinboxSupplier.destroy({
              success: function (tiffinboxSupplier){
                console.log('in DeleteDabbawalaView success');
                app.router.navigate('adminDashboard', {trigger:true});
              }
            });
            return false;
          } 
        }    
    });


app.EditDabbawalaView= Backbone.View.extend({
      el: '.admin-content',
      tpl: Handlebars.compile(
        document.getElementById('edit-dabbawala-template').innerHTML
      ),
      events: {
        'submit .edit-dabbawala-form':'update'    
      },
        render: function (options) {
          var that=this;
          if(options.id){
            var id=options.id;

            that.tiffinboxSupplier = new app.addTiffinBoxSupplier({id:id});
            that.tiffinboxSupplier.fetch({
              success: function (tiffinboxSupplier) { 
                console.log('in edit form:'+ tiffinboxSupplier.toJSON().team);
                window.localStorage.setItem('dabbawalaName', tiffinboxSupplier.attributes.name);
                window.localStorage.setItem('dabbawalaId',tiffinboxSupplier.attributes.id);
                window.localStorage.setItem('category',tiffinboxSupplier.attributes.category);
                 window.localStorage.setItem('mealtype',tiffinboxSupplier.attributes.mealType);
                console.log(tiffinboxSupplier);   
                that.$el.html(that.tpl({tiffinboxSupplier:that.tiffinboxSupplier.toJSON()}));
              }
            })
          }
        },
        update: function(ev){
          console.log('In update');
          var userDetails = $(ev.currentTarget).serializeObject();
          var tiffinboxSupplier= new app.TiffinBoxSupplier();
          tiffinboxSupplier.save(userDetails,{
            success: function(tiffinboxSupplier){
              console.log('in success');
              app.router.navigate('adminDashboard', {trigger:true});
            },
            error: function(){
              console.log('in error');
            }
          });
        }
    });

app.MenuDateView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('menu-date-template').innerHTML
        ),
        events: {
          'submit .assign-menuDate-form' : 'menuDate'
        },

        initialize: function() {
           app.View= this;
        },
        render: function (options) {
          var that=this;
          if(options.id){
            var id=options.id;
            window.localStorage.setItem('id',id);
            that.tiffinboxSupplier = new app.addTiffinBoxSupplier({id:id});
            console.log('url:'+that.tiffinboxSupplier.url);
            that.tiffinboxSupplier.fetch({
              success: function (tiffinboxSupplier) {  
                console.log('in menuDate form:');
                window.localStorage.setItem('dabbawalaName', tiffinboxSupplier.attributes.name);
                window.localStorage.setItem('dabbawalaId',tiffinboxSupplier.attributes.id);
                //console.log(tiffinboxSupplier);   
                that.$el.html(that.tpl({tiffinboxSupplier:that.tiffinboxSupplier.toJSON()}));
              }
            })

            //return false;
          }
        },
        menuDate: function(ev){
          console.log('in menuDate function');
          var menuDetails = $(ev.currentTarget).serializeObject();
          var dabbawalaId = window.localStorage.getItem('dabbawalaId');
          var date = new app.AssignMenuDate({dabbawalaId : dabbawalaId});
          console.log(date.url);
          date.save(menuDetails, {
            success: function(){
              if(app.View)
              app.View.close();

              //window.localStorage.setItem('tiffinboxSupplierId', menu.toJSON()._id);

              console.log('in save menuDate sucess');
              //window.history.back();
              //app.router.navigate('menuDate',{trigger: true});
             //new app.MenuDateView();
             //this.render();
             window.location.reload();
            },
            error: function(model, response){
              console.log('in save menuDate error');
            }
          });
          return false;
        }
         
    });



})();