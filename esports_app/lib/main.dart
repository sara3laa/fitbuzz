import 'package:flutter/material.dart';
import 'package:esports_app/home.dart';
import 'package:esports_app/articles.dart';

void main(){
  runApp(
    MaterialApp(
      home: HomePage(),

      routes:{
        '/articles':(context)=>ArticleListPage(),
        '/home':(context)=>HomePage(),
      } ,
    )
  );
}
