import React, { useState } from "react";
import { registerPlugin } from "@kettu/plugin";
import { useStorage } from "@kettu/storage";
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet 
} from "react-native";
import { HeaderButton } from "@kettu/ui";

// مكون نافذة التعديل المباشر
function ProfileModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [avatar, setAvatar] = useStorage("custom_avatar", "");
  const [banner, setBanner] = useStorage("custom_banner", "");
  const [bio, setBio] = useStorage("custom_bio", "");
  const [effect, setEffect] = useStorage("custom_effect", "");
  const [badge, setBadge] = useStorage("custom_badge", "");

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>تعديل البروفايل (Custom Profile)</Text>
          
          <ScrollView style={styles.form}>
            <Text style={styles.label}>رابط الأفتار (Avatar URL):</Text>
            <TextInput
              style={styles.input}
              value={avatar}
              onChangeText={setAvatar}
              placeholder="https://..."
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>رابط البانر (Banner URL):</Text>
            <TextInput
              style={styles.input}
              value={banner}
              onChangeText={setBanner}
              placeholder="https://..."
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>تأثير البروفايل (Profile Effect URL):</Text>
            <TextInput
              style={styles.input}
              value={effect}
              onChangeText={setEffect}
              placeholder="https://..."
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>أيقونة البادج (Badge Icon URL):</Text>
            <TextInput
              style={styles.input}
              value={badge}
              onChangeText={setBadge}
              placeholder="https://..."
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>الوصف الشخصي (Bio):</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              multiline={true}
              numberOfLines={3}
              placeholder="اكتب وصفك هنا..."
              placeholderTextColor="#666"
            />
          </ScrollView>

          <TouchableOpacity style={styles.saveButton} onPress={onClose}>
            <Text style={styles.saveButtonText}>حفظ وإغلاق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// تسجيل إضافة Kettu
let isModalOpen = false;

registerPlugin({
  name: "Custom Profile Pencil",
  authors: [{ name: "cxsir" }],
  description: "Quickly modify profile avatar, banner, badges, and effects from header pencil button.",

  onStart() {
    // إدراج زر القلم في الهيدر العلوي
    HeaderButton.add({
      id: "kettu-pencil-profile-btn",
      icon: "pencil",
      position: "right",
      onPress: () => {
        isModalOpen = !isModalOpen;
      },
      render: () => <ProfileModal visible={isModalOpen} onClose={() => { isModalOpen = false; }} />
    });
  },

  onStop() {
    HeaderButton.remove("kettu-pencil-profile-btn");
  }
});

// التنسيقات (Styles)
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalContainer: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#111111",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#222222"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16
  },
  form: {
    marginBottom: 12
  },
  label: {
    color: "#aaaaaa",
    fontSize: 13,
    marginBottom: 4,
    marginTop: 8
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#333333"
  },
  textArea: {
    height: 70,
    textAlignVertical: "top"
  },
  saveButton: {
    backgroundColor: "#5865F2",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15
  }
});
