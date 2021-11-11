var connection = new require("./kafka/Connection");
var UserSignin = require("./services/usersignin");
var GetUserAuth = require("./services/getuserauth");
const GetDeliveryAddress = require("./services/getdeliveryaddress");
const AddDelieverAddress = require("./services/adddeliveryaddress");
const AddFavourite = require("./services/addfav");
const GetFavourite = require("./services/getfav");
const RestSignin = require("./services/restsignin");
const GetRestAuth = require("./services/getrestauth");
const GetAllRestaurants = require("./services/getallrestaurants");
const GetAllDishes = require("./services/getalldishes");
const UserSignup = require("./services/usersignup");
const GetUserProfile = require("./services/getuserprofile");
const GetUserProfileById = require("./services/getuserprofile");
const UpdateUserProfile = require("./services/updateuserprofile");
const GetOrders = require("./services/getorders");
const RestaurantSignup = require("./services/restsignup");
const GetRestaurantDishes = require("./services/getrestaurantdishes");
const UpdateRestaurantProfile = require("./services/updaterestaurantprofile");
const UpdateRestaurantDishes = require("./services/updatedish");
const CreateRestaurantDishes = require("./services/createdish");
const DeleteRestaurantDish = require("./services/deletedish");
const GetRestaurantOrders = require("./services/getrestaurantorders");
const UpdateDeliveryStatus = require("./services/updatedeliverystatus");
const GetUserOrders = require("./services/getuserpastorders");
const CancelUserOrder = require("./services/usercancelorder");
const PlaceOrder = require("./services/placeorder");
const UploadRestaurantImage = require("./services/uploadrestaurantimage");
const UploadDishImage = require("./services/uploaddishimage");
const UploadUserImage = require("./services/uploaduserimage");
const GetRestaurantProfile = require("./services/getrestaurantprofile");
var connectDb = require("./config/db-mongo");

connectDb();
function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();

  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);

    var data = JSON.parse(message.value);
    fname.handle_request(data.data, function (err, res) {
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {});
      return;
    });
  });
}

handleTopicRequest("validate-login", UserSignin);
handleTopicRequest("get-user", GetUserAuth);
handleTopicRequest("get-address", GetDeliveryAddress);
handleTopicRequest("add-delivery-address", AddDelieverAddress);
handleTopicRequest("add-favourite", AddFavourite);
handleTopicRequest("get-favourite", GetFavourite);
handleTopicRequest("get-restaurant", GetRestAuth);
handleTopicRequest("get-restaurants", GetAllRestaurants);
handleTopicRequest("get-dishes", GetAllDishes);
handleTopicRequest("validate-rest-login", RestSignin);
handleTopicRequest("user-signup", UserSignup);
handleTopicRequest("get-userprofile", GetUserProfile);
handleTopicRequest("get-userbyid", GetUserProfileById);
handleTopicRequest("update-userprofile", UpdateUserProfile);
handleTopicRequest("get-orders", GetOrders);
handleTopicRequest("restaurant-signup", RestaurantSignup);
handleTopicRequest("get-restaurant-dishes", GetRestaurantDishes);
handleTopicRequest("get-restaurantprofile", GetRestaurantProfile);
handleTopicRequest("update-restaurantprofile", UpdateRestaurantProfile);
handleTopicRequest("update-restaurant-dish", UpdateRestaurantDishes);
handleTopicRequest("delete-restaurant-dish", DeleteRestaurantDish);
handleTopicRequest("create-restaurant-dish", CreateRestaurantDishes);
handleTopicRequest("get-restaurant-orders", GetRestaurantOrders);
handleTopicRequest("update-delivery-status", UpdateDeliveryStatus);
handleTopicRequest("get-past-orders", GetUserOrders);
handleTopicRequest("cancel-order", CancelUserOrder);
handleTopicRequest("place-order", PlaceOrder);
handleTopicRequest("upload-rest-image", UploadRestaurantImage);
handleTopicRequest("upload-dish-image", UploadDishImage);
handleTopicRequest("upload-user-image", UploadUserImage);
