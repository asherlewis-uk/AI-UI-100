import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
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

import { CharacterAvatar } from "@/components/CharacterAvatar";
import Colors from "@/constants/colors";
import {
  generateConversationId,
  generateMessageId,
  useChats,
} from "@/context/ChatsContext";
import { getCharacterById } from "@/data/characters";

export default function CharacterDetailScreen() {
  const C = Colors.dark;
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getConversation, upsertConversation } = useChats();

  const character = getCharacterById(id);

  if (!character) {
    return (
      <View style={[styles.container, { backgroundColor: C.background }]}>
        <Text style={{ color: C.text }}>Character not found.</Text>
      </View>
    );
  }

  const handleStartChat = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    let conversation = getConversation(character.id);
    if (!conversation) {
      const convId = generateConversationId(character.id);
      conversation = {
        id: convId,
        characterId: character.id,
        characterName: character.name,
        lastMessage: character.greeting.slice(0, 80),
        lastMessageTime: Date.now(),
        messages: [
          {
            id: generateMessageId(),
            role: "assistant" as const,
            content: character.greeting,
            timestamp: Date.now(),
          },
        ],
      };
      await upsertConversation(conversation);
    }

    router.push({ pathname: "/chat/[id]", params: { id: character.id } });
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero */}
        <View style={[styles.hero, { paddingTop: topPad + 16 }]}>
          <LinearGradient
            colors={[character.avatarColors[0] + "44", "transparent"]}
            style={StyleSheet.absoluteFill}
          />
          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            style={[styles.backBtn, { backgroundColor: C.card }]}
          >
            <Feather name="arrow-left" size={20} color={C.text} />
          </Pressable>

          <CharacterAvatar
            colors={character.avatarColors}
            emoji={character.avatarEmoji}
            size={100}
          />
          <Text style={[styles.name, { color: C.text }]}>{character.name}</Text>
          <Text style={[styles.tagline, { color: C.textSecondary }]}>
            {character.tagline}
          </Text>

          {/* Category & count */}
          <View style={styles.metaRow}>
            <View style={[styles.badge, { backgroundColor: C.card, borderColor: C.border }]}>
              <Text style={[styles.badgeText, { color: C.textSecondary }]}>
                {character.category}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: C.card, borderColor: C.border }]}>
              <Feather name="message-circle" size={12} color={C.textMuted} />
              <Text style={[styles.badgeText, { color: C.textSecondary }]}>
                {character.messageCount}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: C.text }]}>About</Text>
          <Text style={[styles.description, { color: C.textSecondary }]}>
            {character.description}
          </Text>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: C.text }]}>Tags</Text>
          <View style={styles.tagsRow}>
            {character.tags.map((tag) => (
              <View
                key={tag}
                style={[
                  styles.tag,
                  { backgroundColor: C.tintGlow, borderColor: C.tint + "44" },
                ]}
              >
                <Text style={[styles.tagText, { color: C.tintLight }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Creator */}
        <View style={styles.section}>
          <Text style={[styles.creatorLabel, { color: C.textMuted }]}>
            Created by {character.creator}
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View
        style={[
          styles.ctaContainer,
          {
            backgroundColor: C.background,
            paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 12,
          },
        ]}
      >
        <Pressable
          onPress={handleStartChat}
          style={({ pressed }) => [
            styles.startChatBtn,
            { opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startChatGradient}
          >
            <Feather name="message-circle" size={18} color="#fff" />
            <Text style={styles.startChatText}>Start Chat</Text>
          </LinearGradient>
        </Pressable>
      </View>
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
  hero: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
    overflow: "hidden",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  name: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    marginTop: 8,
    textAlign: "center",
  },
  tagline: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  description: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  creatorLabel: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  ctaContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#2A2A2A",
  },
  startChatBtn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  startChatGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
  },
  startChatText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
});
