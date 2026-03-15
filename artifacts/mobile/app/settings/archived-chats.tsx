import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CharacterAvatar } from "@/components/CharacterAvatar";
import Colors from "@/constants/colors";
import { useChats } from "@/context/ChatsContext";
import { getCharacterById } from "@/data/characters";

export default function ArchivedChatsScreen() {
  const C = Colors.dark;
  const insets = useSafeAreaInsets();
  const { archivedConversations, restoreConversation, deleteArchivedConversation } =
    useChats();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const handleRestore = (id: string, name: string) => {
    Alert.alert("Restore Chat", `Restore your conversation with ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Restore",
        onPress: () => restoreConversation(id),
      },
    ]);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "Delete Permanently",
      `This will permanently delete your conversation with ${name}. This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteArchivedConversation(id),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: topPad + 8,
            borderBottomColor: C.border,
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color={C.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: C.text }]}>
          Archived Chats
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {archivedConversations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIcon, { backgroundColor: C.card }]}>
              <Feather name="archive" size={32} color={C.tealMuted} />
            </View>
            <Text style={[styles.emptyTitle, { color: C.text }]}>
              No archived chats
            </Text>
            <Text style={[styles.emptyText, { color: C.textSecondary }]}>
              Swipe left on a chat to archive it
            </Text>
          </View>
        ) : (
          archivedConversations.map((conv) => {
            const char = getCharacterById(conv.characterId);
            return (
              <View
                key={conv.id}
                style={[styles.chatItem, { borderBottomColor: C.border }]}
              >
                <View style={styles.chatInfo}>
                  {char ? (
                    <CharacterAvatar
                      colors={char.avatarColors}
                      emoji={char.avatarEmoji}
                      size={44}
                    />
                  ) : (
                    <View
                      style={[styles.fallbackAvatar, { backgroundColor: C.card }]}
                    >
                      <Feather name="user" size={20} color={C.textMuted} />
                    </View>
                  )}
                  <View style={styles.chatText}>
                    <Text
                      style={[styles.chatName, { color: C.text }]}
                      numberOfLines={1}
                    >
                      {conv.characterName}
                    </Text>
                    <Text
                      style={[styles.chatPreview, { color: C.textSecondary }]}
                      numberOfLines={1}
                    >
                      {conv.messages.length} messages
                    </Text>
                  </View>
                </View>
                <View style={styles.chatActions}>
                  <Pressable
                    onPress={() =>
                      handleRestore(conv.id, conv.characterName)
                    }
                    style={[styles.actionBtn, { backgroundColor: C.card }]}
                  >
                    <Feather name="rotate-ccw" size={16} color={C.teal} />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleDelete(conv.id, conv.characterName)
                    }
                    style={[styles.actionBtn, { backgroundColor: C.card }]}
                  >
                    <Feather name="trash-2" size={16} color={C.error} />
                  </Pressable>
                </View>
              </View>
            );
          })
        )}
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 20,
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
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  chatInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fallbackAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  chatText: {
    flex: 1,
    gap: 2,
  },
  chatName: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  chatPreview: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  chatActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
