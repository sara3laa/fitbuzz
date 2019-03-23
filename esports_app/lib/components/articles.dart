import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:async';
import 'package:esports_app/models/article.dart';
import 'package:http/http.dart' as http;




class ArticlesListPage extends StatelessWidget {

  ArticlesListPage(){
    getArticles();
  }
  List<Article> articles;

  Future<List<Article>> getArticles() async {
    final response =
    await http.get('https://jsonplaceholder.typicode.com/posts');

    if (response.statusCode == 200) {
      // If server returns an OK response, parse the JSON
      dynamic body = json.decode(response.body);
    } else {
      // If that response was not OK, throw an error.
      throw Exception('Failed to load post');
    }



    return articles;
  }



  @override
  Widget build(BuildContext context) {
    return Container(
        height: 100.0,
        child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemBuilder: (BuildContext context, int index) {
              return new Card(
                  child: InkWell(
                    onTap: () {},
                    child: Text(articles[index].title),

                  )
              );
            }
        )
    );
  }
}
