const UserProfile = require("../../../models/UserProfile");
const User = require("../../../models/User");
const { UserInputError } = require("apollo-server-express");
const userProfileResolver = {
  Query: {
    async getUserProfile(_, userid) {
      console.log(userid);
      const profile = await UserProfile.findOne({
        profileid: userid.userid,
      });
      return profile;
    },
  },
  Mutation: {
    async updateProfile(
      _,
      {
        profile: {
          name,
          street,
          city,
          state,
          country,
          nickname,
          about,
          dob,
          email,
          ph_no,
        },
        context,
      }
    ) {
      const userauth = checkAuth(context);
      let user = await User.findOne({ _id: userauth.id });
      let profile = await UserProfile.findOne({ profileid: userauth.id });
      let profileFields = {};
      profileFields.profileid = userauth.id;
      profileFields.name = name;
      profileFields.street = street;
      profileFields.city = city;
      profileFields.state = state;
      profileFields.country = country;
      profileFields.nickname = nickname;
      profileFields.about = about;
      profileFields.dob = dob;
      profileFields.email = email;
      profileFields.ph_no = ph_no;

      if (profile) {
        profile = await UserProfile.findOneAndUpdate(
          { profileid: user.id },
          { $set: profileFields },
          { new: true }
        );
        return profile;
      } else {
        profile = new UserProfile(profileFields);
        await profile.save();
        return profile;
      }
    },
  },
};
module.exports = userProfileResolver;
