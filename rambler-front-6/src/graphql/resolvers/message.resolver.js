import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const NEW_MESSAGE="messageAdded";

export default {
    Message: {
        user: async({userId }, args, { models}) => models.User.findOne({where: { id: userId}}),
    },
    Query: {
        getMessages: async(parent, args, { models }) => models.Message.findAll(),
    },
    Subscription: {
        messageAdded: {
          subscribe: 
            () => pubsub.asyncIterator(NEW_MESSAGE),
        },
    },
    Mutation: {
        sendMessage: async(parent, { username, text }, { models }) => {
            try {
                const user = await models.User.findOne({where: { username }}, { raw: true})
                if(!user) {
                    return {
                        ok: false,
                    }
                }
                const message = await models.Message.create({userId:user.id, text});
                
                pubsub.publish(NEW_MESSAGE, {messageAdded: {...message.dataValues, user: user.dataValues} }); 
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}