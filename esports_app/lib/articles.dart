import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';
import 'package:esports_app/util/network.dart';


class ArticleListPage extends StatefulWidget{

    @override
   State<StatefulWidget> createState(){
      return _ArticlesListPageState();
    }
}
class _ArticlesListPageState extends State<ArticleListPage> {

  @override
  initState(){
    super.initState();
  }



  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    return Card(
      child: Container(
        width: screenSize.width,
        height: (screenSize.height)/3,

      child: FutureBuilder(
          future: Network().getArticles(),
          builder:(BuildContext context, AsyncSnapshot snap){
            if(snap.data == null){
              return Text('sara');
      }
            else {

                     return ListView.builder(

                       scrollDirection: Axis.horizontal,
                         itemCount: snap.data.length,

                         itemBuilder: (BuildContext context ,int index){
                           return new Column(
                             children: <Widget>[

                               new FadeInImage.memoryNetwork(

                                 placeholder: kTransparentImage,
                                 image: snap.data[index].image,
                                 alignment: Alignment.topCenter,
                                 width: (screenSize.width),
                                 height: (screenSize.height-100.0)/3,
                                 fit: BoxFit.fill,
                               ),
                               new Padding(
                                 padding: const EdgeInsets.fromLTRB(8.0, 8.0, 0.0, 0.0),
                                 child: new Text(
                                   snap.data[index].title,
                                   style:
                                   new TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0),
                                 ),
                               ),

                             ],
                           );
                         },);
              }
      },


      ),
    )
    );

  }
}

