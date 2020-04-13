const Dialog = require("../models/dialog.model");
const User = require("../models/user.model");

exports.isExist = function (req, res, next) {
  try {
    Dialog.find(
      { User1: req.url.substr(8), User2: req.headers.myid },
      (err, data) => {
        if (data.length) {
          req.isExist = true;
          next();
        } else {
          Dialog.find(
            { User2: req.url.substr(8), User1: req.headers.myid },
            (err, data) => {
              if (data.length) {
                req.isExist = true;
                next();
              } else {
                req.isExist = false;
                next();
              }
            }
          );
        }
      }
    );
  } catch {
    next();
  }
};

exports.open_dialog = function (req, res) {
  if (!req.isExist) {
    console.log(req.url.substr(8));
    let dialog = new Dialog({
      dialogID: req.url.substr(8) + "" + req.headers.myid,
      User1: req.headers.myid,
      User2: req.url.substr(8),
    });
    dialog.save(function (err) {
      if (err) {
        console.log("error");
        return err;
      }
      console.log("Dialog Created successfully");
    });
    User.find({ login: req.headers.myid }, (err, data) => {
      let dialogsArray = data["0"].dialogs;
      dialogsArray.push(dialog.dialogID);
      User.updateOne(
        { login: req.headers.myid },
        { dialogs: dialogsArray },
        function (err, result) {
          if (err) return console.log(err);
          console.log(result);
        }
      );
    });
    User.find({ login: req.url.substr(8) }, (err, data) => {
      let dialogsArray = data["0"].dialogs;
      dialogsArray.push(dialog.dialogID);
      User.updateOne(
        { login: req.url.substr(8) },
        { dialogs: dialogsArray },
        function (err, result) {
          if (err) return console.log(err);
          console.log(result);
        }
      );
    });
  } else {
    console.log("dialog exist");
    res.sendFile();
  }
  // let profilePath = __dirname.split("\\");
  // if(profilePath[profilePath.length-1] == "controllers") {
  //   let path = profilePath.splice(0, 3);
  //   profilePath = path.join("\\")
  //   res.sendFile(profilePath + "/public/profile.html")
  // }
};

exports.show_dialog_list = function (req, res) {
  let profilePath = __dirname.split("\\");
  if (profilePath[profilePath.length - 1] == "controllers") {
    let path = profilePath.splice(0, 3);
    profilePath = path.join("\\");
    res.sendFile(profilePath + "/public/dialog_list.html");
  }
};

exports.return_user_dialogs = function (req, res) {
  User.find({ login: req.headers.myid }, async (err, data) => {
    let responseDialogArray = {};
    let currentLogin = data["0"].login;
    // console.log(data['0'].dialogs.length);

    User.aggregate(
      [
        { $match: { login: currentLogin } },
        { $unwind: "$dialogs" },
        {
          $lookup: {
            from: "dialogs",
            localField: "dialogs",
            foreignField: "dialogID",
            as: "resultDialog",
          },
        },
      ],
      (err, data) => {
        console.log(currentLogin);
        resDialogs = []  
        for( let i = 0; i < data.length; i++) {
          if(data[i].resultDialog['0'].User1 != currentLogin){
            resDialogs.push(data[i].resultDialog['0'].User1)
          } else {
            resDialogs.push(data[i].resultDialog['0'].User2)
          }
          
        }
        
        console.log(resDialogs);
        res.send(resDialogs)
      }
    );

    //   for(let i = 0; i < data['0'].dialogs.length; i++) {

    //     Dialog.find({dialogID: data['0'].dialogs[i]}, (err, data) => {
    //       if(data['0'].User1 == currentLogin){
    //        let secondUser = data['0'].User2
    //         User.find({login: secondUser}, (err, data) => {

    //         //  console.log(data['0'].name);
    //         //  console.log(data['0'].img);
    //          responseDialogArray[Object.keys(responseDialogArray).length] = {
    //            name: data['0'].name,
    //            img: data['0'].img
    //          }
    //         })
    //       } else{
    //        let secondUser = data['0'].User1
    //        User.find({login: secondUser}, (err, data) => {
    //         //  console.log(data['0'].name);
    //         //  console.log(data['0'].img);
    //          responseDialogArray[Object.keys(responseDialogArray).length] = {
    //            name: data['0'].name,
    //            img: data['0'].img
    //          }
    //         //  console.log(responseDialogArray);
    //          // responseDialogArray[Object.keys(responseDialogArray).length] = {name: data['0'].name, img: data['0'].img}
    //        })
    //       }
    //     })
    //  }

    // res.send(responseDialogArray)
  });
};
