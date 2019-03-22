import 'package:flutter/material.dart';
import 'package:carousel_pro/carousel_pro.dart';
void main(){
  runApp(
    MaterialApp(
      home: HomePage(),
    )
  );
}
class HomePage extends StatefulWidget{
  @override
  _HomePageState createState() => _HomePageState();
}
class _HomePageState extends State<HomePage>{
  @override
  Widget build(BuildContext context){
    Widget image_carousel = new Container(
      height: 150.0,
      child: new Carousel(
        boxFit: BoxFit.cover,
        images: [  new NetworkImage('https://bit.ly/2CwzpES'),
        new NetworkImage('https://bit.ly/2FriTrr'),
        new NetworkImage('https://bit.ly/2UQtIIT'),
        new NetworkImage('https://bit.ly/2UK1EHc')],
        autoplay: false,
        animationCurve: Curves.fastOutSlowIn,
        animationDuration: Duration(microseconds: 1000) ,
        dotSize: 4.0,
        indicatorBgPadding: 2.0,
      ),
    );
    return Scaffold(
      appBar: new AppBar(
        backgroundColor: Colors.deepOrangeAccent,
        title: Text('Fitbuzz'),
        actions: <Widget>[
          new IconButton(icon: Icon(Icons.search,color: Colors.white) , onPressed: (){}),
          new IconButton(icon: Icon(Icons.shopping_cart,color: Colors.white) , onPressed: (){})
        ],
      ),
      drawer: new Drawer(
        child: new ListView(
          children: <Widget>[

            new UserAccountsDrawerHeader(
                accountName: Text('Sara Alaa'),
                accountEmail: Text('sara@example.com'),
                currentAccountPicture: GestureDetector(
                  child: new CircleAvatar(backgroundColor: Colors.deepOrangeAccent,
                  child: Icon(Icons.person , color:Colors.white),),
                ),
                decoration: new BoxDecoration(
                  color: Colors.deepOrangeAccent
                ),
            ),

            InkWell(
                onTap: (){},
                child: ListTile(
                title: Text('Home Page'),
                leading: Icon(Icons.home , color: Colors.lightBlue),
          )
            ),

            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('My Account'),
                  leading: Icon(Icons.person , color: Colors.lightBlue),
                )
            ),
            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('My Orders'),
                  leading: Icon(Icons.shopping_basket , color: Colors.lightBlue),
                )
            ),
            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('Articles'),
                  leading: Icon(Icons.receipt , color: Colors.lightBlue),
                )
            ),
            Divider(),
            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('Settings'),
                  leading: Icon(Icons.settings , color: Colors.lightBlue),
                )
            ),
            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('About'),
                  leading: Icon(Icons.help , color: Colors.blueAccent),
                )
            )
          ],
        ),
      ),
      body: new ListView(
        children: <Widget>[
          image_carousel
        ],
      ),
    );
  }
}