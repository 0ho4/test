import React from "react";
import { registerPlugin } from "@kettu/plugin";
import { HeaderButton, Modal, Input, Button, ScrollView, Text } from "@kettu/components";
import { useStorage } from "@kettu/storage";

// إنشاء واجهة شاشة التعديل التي تفتح عند الضغط على القلم
function ProfileEditorModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [avatar, setAvatar] = useStorage("custom_avatar", "");
  const [banner, setBanner] = useStorage("custom_banner", "");
  const [bio, setBio] = useStorage("custom_bio", "");
  const [effect, setEffect] = useStorage("custom_effect", "");

  if (!visible) return null;

  return (
    <Modal title="تعديل البروفايل (Custom Profile)" onClose={onClose}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ color: "#fff", marginBottom: 8 }}>رابط الأفتار:</Text>
        <Input value={avatar} onChangeText={setAvatar} placeholder="https://..." />

        <Text style={{ color: "#fff", marginVertical: 8 }}>رابط البانر:</Text>
        <Input value={banner} onChangeText={setBanner} placeholder="https://..." />

        <Text style={{ color: "#fff", marginVertical: 8 }}>تأثير البروفايل (Effect):</Text>
        <Input value={effect} onChangeText={setEffect} placeholder="https://..." />

        <Text style={{ color: "#fff", marginVertical: 8 }}>الوصف الشخصي (Bio):</Text>
        <Input value={bio} onChangeText={setBio} multiline placeholder="اكتب وصفك هنا..." />

        <Button text="حفظ وإغلاق" onPress={onClose} style={{ marginTop: 16 }} />
      </ScrollView>
    </Modal>
  );
}

// تسجيل البلوقن وإضافة زر القلم في الزاوية العلوية (Header Right)
registerPlugin({
  name: "Custom Profile",
  authors: [{ name: "cxsir" }],
  description: "تعديل البروفايل والبادجات والتأثيرات من خلال زر القلم العلوي.",

  onStart() {
    let modalVisible = false;

    // إضافة أداة القلم إلى الهيدر الرئيسي فوق
    HeaderButton.add({
      id: "kettu-profile-editor-btn",
      icon: "pencil", // أيقونة القلم
      position: "right",
      onPress: () => {
        modalVisible = true;
      },
      renderModal: () => (
        <ProfileEditorModal 
          visible={modalVisible} 
          onClose={() => { modalVisible = false; }} 
        />
      )
    });
  },

  onStop() {
    HeaderButton.remove("kettu-profile-editor-btn");
  }
});
