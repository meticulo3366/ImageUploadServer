## Creating Facebook Application to get app ID and app Secret for web application

First thing one needs to do in order to connect a web or mobile application with facebook is to create a facebook application. For creating facebook application, go to [facebook developers][1] site and login to your facebook account. You may be redirected to `https://www.facebook.com` i.e your newsfeed after logging in. In that case, replace `www` in URL to `developers` i.e.`https://developers.facebook.com`. Now, follow the following steps for creating application:

1. Go to `Apps` tab and click `Create a New App`.
2. Enter display name(name of application), a namespace(this is optional and can be any string), choose category of application and click `Create App`.

    ![enter image description here][2]

3. Enter captcha, your app will be created and you will be redirected to application dashboard.
    ![enter image description here][3]
4.  App ID and App Secret thus generated are required for integrating facebook login with application be it web or mobile application.
5.  To use facebook login with any platform, we need to add that platform to the facebook application created. To do so, go to `Settings` tab and click on `Add Platform` button. Choose appropriate platform, `Website` in our case.
    ![enter image description here][4]

    ![enter link description here][5]
    
6.  Enter the website's URL and click on `Save changes`. 

This is minimum required configuration on facebook developers site. **Using this configuration, only the user who created application will be able to login via facebook from the web application** in which facebook is integrated.

In order to make all users able to login with facebook from our web application, we need to set some configuration at facebook developers site. Option for making facebook login in web application public is available in `Status and Review` tab in application's dashboard. 

####Allowing all users to login via facebook from our web application:
Go to `Status and Review` tab of facebook application dashboard
    ![enter link description here][6]


and set, 
```
`Do you want to make this app and all its live features available to the general public?` to `Yes`. 
```

![enter link description here][7]

Setting above option to `Yes` will allow all users to login via facebook from web application.


  


  [1]: https://developers.facebook.com/
  [2]: https://dl.dropbox.com/s/kav823tg17xm3s5/Screenshot%20from%202014-02-04%2010%3A58%3A54.png
  [3]: https://dl.dropbox.com/s/0uc8n11v6i9g73t/Screenshot%20from%202014-02-04%2011%3A20%3A13.png
  [4]: https://dl.dropbox.com/s/mdfqhvn410a2hd3/Screenshot%20from%202014-02-04%2011%3A29%3A22.png
  [5]: https://dl.dropbox.com/s/0s43yw8apaaqikp/Screenshot%20from%202014-02-04%2011%3A53%3A03.png
  [6]: https://dl.dropbox.com/s/f2uhzx4y1exxxlv/Screenshot%20from%202014-02-04%2011%3A57%3A57.png
  [7]: https://dl.dropbox.com/s/xm6s512imr3cjzb/Screenshot%20from%202014-02-04%2012%3A06%3A32.png