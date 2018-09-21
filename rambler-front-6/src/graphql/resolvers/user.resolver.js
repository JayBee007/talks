export default {
  Mutation:{
    login: async(parent, { username }, { models }) => {
      try {
        const user = await models.User.create({username});
        if(!user) {
          return false;
        }
        return true;
      }catch(err) {
        return false;
      }
    }
  }
}