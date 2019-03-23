import 'dart:io';
import 'dart:convert';
import 'dart:async';
import 'package:scoped_model/scoped_model.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:rxdart/subjects.dart';
import 'package:mime/mime.dart';
import 'package:http_parser/http_parser.dart';

import '../models/article.dart';


class ConnectedArticlesModel  extends Model{
  List<Article> _articles =[];
  String _selArticleId;
  bool _isLoading = false;
}

class ArticlesModel extends ConnectedArticlesModel {
  List <Article> get allArticles  {
    return List.from(_articles);
  }
  int get selectedArticleIndex{
    return _articles.indexWhere((Article article){
      return (article.id==_selArticleId);
    });
  }
  String get selectedArticleId{
    return _selArticleId;
  }
  Article get SelectedArticle{
    if(selectedArticleId==null){
      return null;
    }return _articles.firstWhere((Article article){
      return article.id == _selArticleId;
    });
  }
  Future<Null> fetchArticles({clearExisting = false}){
    _isLoading = true;
    if(clearExisting){
      _articles =[];
  }
    notifyListeners();
    return http
        .get('http://localhost:3000/articles').then<Null>((http.Response response){
          final List<Article> fetchedArticleList =[];
          final List<dynamic> ArticleListData = json.decode(response.body);
          ArticleListData.forEach((dynamic articleData){
              final Article article =  Article(
              id: articleData._id,
              title: articleData.title,
              content:articleData.content,
              image:articleData.image
          );
          fetchedArticleList.add(article);
          });

      _articles = fetchedArticleList;
      _isLoading = false;
      notifyListeners();
      _selArticleId = null;
    }).catchError((error){
      _isLoading = false;
      notifyListeners();
      return;
    });
    }

  }
class UtilityModel extends ConnectedArticlesModel {
  bool get isLoading {
    return _isLoading;
  }
}


