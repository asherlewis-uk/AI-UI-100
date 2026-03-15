import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChatListItem } from "@/components/ChatListItem";
import Colors from "@/constants/colors";
import { useChats } from "@/context/ChatsContext";
import { CHARACTERS, getCharacterById } from "@/data/characters";

export default function ChatsScreen() {
  const C = Colors.dark;
  const insets = useSafeAreaInsets();
  const { conversations, isLoaded } = useChats();

  const topPadding = Platform.OS === "web" ? 67 : 0;

  const validConversations = conversations.filter((c) => {
    const char = getCharacterById(c.characterId);
    return !!char;
  });

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Platform.OS === "web" ? topPadding : 0 },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: C.text }]}>Chats</Text>
        </View>

        {!isLoaded ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: C.textSecondary }]}>Loading...</Text>
          </View>
        ) : validConversations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIcon, { backgroundColor: C.card }]}>
              <Feather name="message-circle" size={32} color={C.textMuted} />
            </View>
            <Text style={[styles.emptyTitle, { color: C.text }]}>No chats yet</Text>
            <Text style={[styles.emptyText, { color: C.textSecondary }]}>
              Discover personas and start a conversation
            </Text>
            <Pressable
              onPress={() => router.push("/")}
              style={[styles.discoverBtn, { backgroundColor: C.tint }]}
            >
              <Text style={styles.discoverBtnText}>Browse Personas</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={[styles.divider, { backgroundColor: C.border }]} />
            {validConversations.map((conv) => {
              const char = getCharacterById(conv.characterId)!;
              return (
                <View key={conv.id}>
                  <ChatListItem conversation={conv} character={char} />
                  <View style={[styles.itemDivider, { backgroundColor: C.border, marginLeft: 84 }]} />
                </View>
              );
            })}
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
  },
  divider: {
    height: 1,
  },
  itemDivider: {
    height: StyleSheet.hairlineWidth,
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
  },
  discoverBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 8,
  },
  discoverBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
