import 'package:flutter/material.dart';

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
    return Scaffold(
      appBar: new AppBar(
        backgroundColor: Colors.blueAccent,
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
                  child: new CircleAvatar(backgroundColor: Colors.lightBlue,
                  child: Icon(Icons.person , color:Colors.white),),
                ),
                decoration: new BoxDecoration(
                  color: Colors.blueAccent
                ),
            ),

            InkWell(
                onTap: (){},
                child: ListTile(
                title: Text('Home Page'),
                leading: Icon(Icons.home),
          )
            ),

            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('My Account'),
                  leading: Icon(Icons.person),
                )
            ),
            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('My Orders'),
                  leading: Icon(Icons.shopping_basket),
                )
            ),
            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('Articles'),
                  leading: Icon(Icons.receipt),
                )
            ),
            Divider(),
            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('Settings'),
                  leading: Icon(Icons.settings),
                )
            ),
            InkWell(
                onTap: (){},
                child: ListTile(
                  title: Text('About'),
                  leading: Icon(Icons.help),
                )
            )
          ],
        ),
      ),
    );
  }
}