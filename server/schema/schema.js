const { query } = require('express');
const {project, client} = require('../sampleData.js');

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema} = require('graphql');

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields:() => ({
        id: {type : GraphQLID },
        name:{type: GraphQLString},
        email: { type: GraphQLString},
        phone: {type: GraphQLString}
    })

});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        client:{
            type: ClientType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return client.find(client => client.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
})
