import 'package:esports_app/models/article.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
class Network{
  String articles_url ='https://reqres.in/api/users';
  List<Article> articles =[];
  Future<List<Article>> getArticles() async{
   final res = await http.get(articles_url,headers: {"Accept":"application/json"});

   final datajson = json.decode(res.body);
   final data= datajson['data'];

   for (var u in data){
    Article article =  Article(id:u['id'],title: u['first_name'],content: u['last_name'],image: u['avatar']);
    articles.add(article);
   }

     return articles;

  }

}
