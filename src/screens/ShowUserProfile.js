import { Avatar, Box, HStack, Text, View, VStack } from "native-base";
import React, { useState, useEffect } from "react";

export default function ShowUserProfile(profile) {
  console.log("profile", profile);

  const user = profile.route.params.user;

  console.log("user", user);

  return (
    <View
      style={{
        justifyContent: "center",
        padding: 20,
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <HStack
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Avatar
          size="xl"
          source={{ uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }}>
          BB
        </Avatar>

        <VStack>
          <Text>{user.firstName}</Text>
          <Text>{user?.job}</Text>
        </VStack>
      </HStack>

      <Box
        style={{
          padding: 20,
          marginBottom: 20,
          borderColor: '#000',
          borderWidth: 0.75,
        }}>
        <Text>{user?.description}</Text>
      </Box>

      {/* @todo : afficher les annonces du loueur */}

    </View>
  );
}
