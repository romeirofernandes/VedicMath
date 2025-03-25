import { supabase } from "../lib/supabaseClient";

export const getUserProgress = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      console.error("Auth error:", error);
      return null;
    }

    const { data: progressData, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    if (progressError && progressError.code !== "PGRST116") {
      console.error("Error fetching progress:", progressError);
      return null;
    }

    return progressData || null;
  } catch (error) {
    console.error("Error in getUserProgress:", error);
    return null;
  }
};

export const completeLesson = async (lessonId) => {
  try {
    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    // Get current progress
    const { data: currentProgress, error: fetchError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching progress:", fetchError);
      return null;
    }

    // If no progress record exists, create one
    if (!currentProgress) {
      const { data: newData, error: insertError } = await supabase
        .from("user_progress")
        .insert([
          {
            user_id: user.id,
            current_lesson: lessonId + 1,
            completed_lessons: [lessonId],
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Error creating progress:", insertError);
        return null;
      }

      return newData;
    }

    // Update existing progress
    let completedLessons = currentProgress.completed_lessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    const newCurrentLesson = Math.max(
      currentProgress.current_lesson,
      lessonId + 1
    );

    const { data: updatedData, error: updateError } = await supabase
      .from("user_progress")
      .update({
        completed_lessons: completedLessons,
        current_lesson: newCurrentLesson,
        updated_at: new Date(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating progress:", updateError);
      return null;
    }

    return updatedData;
  } catch (error) {
    console.error("Error in completeLesson:", error);
    return null;
  }
};
