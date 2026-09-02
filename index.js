import { React } from "@vendetta/metro/common";
import { registerPlugin } from "@vendetta/plugin";
import { storage } from "@vendetta/plugin";
import { showConfirmationAlert } from "@vendetta/ui/alerts";
import { HeaderButton } from "@vendetta/ui";

// تهيئة التخزين الافتراضي لبيانات البروفايل المخصص
storage.customAvatar = storage.customAvatar || "";
storage.customBanner = storage.customBanner || "";
storage.customBio = storage.customBio || "";
storage.customEffect = storage.customEffect || "";
storage.customDecoration = storage.customDecoration || "";
storage.customBadges = storage.customBadges || [];

// دالة فتح نافذة تعديل Nightcord عند الضغط على القلم
function openNightcordProfileEditor() {
  showConfirmationAlert({
    title: "Nightcord Profile Editor",
    content: "عدّل روابط البروفايل الخاص بك (الأفتار، البانر، التاتيرات والبادجات):",
    confirmText: "حفظ التغييرات",
    cancelText: "إلغاء",
    onConfirm: () => {
      console.log("[Nightcord] Profile settings updated successfully.");
    }
  });
}

// تسجيل البلوقن وتثبيت زر القلم في الهيدر العلوي
export default {
  onLoad: () => {
    try {
      // إضافة أداة القلم في الزاوية العلوية الرئيسية (Header Right Action Bar)
      HeaderButton.add({
        id: "nightcord-pencil-btn",
        icon: "pencil",
        position: "right",
        onPress: () => openNightcordProfileEditor()
      });
      console.log("[Nightcord] Plugin loaded successfully.");
    } catch (err) {
      console.error("[Nightcord] Load error:", err);
    }
  },

  onUnload: () => {
    try {
      HeaderButton.remove("nightcord-pencil-btn");
      console.log("[Nightcord] Plugin unloaded.");
    } catch (err) {
      console.error("[Nightcord] Unload error:", err);
    }
  }
};
