export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ContentType = "video" | "audio" | "pdf" | "doc"
export type Level = "beginner" | "intermediate" | "advanced"
export type Difficulty = "easy" | "medium" | "hard"

export type Database ={
  public: {
    Tables: {
      AuditLog: {
        Row: {
          id: string
          createdAt: string
          actorId: string | null
          actorRole: string | null
          action: string | null
          targetId: string | null
          targetRole: string | null
          details: Json | null
        }
        Insert: {
          id?: string
          createdAt?: string
          actorId?: string | null
          actorRole?: string | null
          action?: string | null
          targetId?: string | null
          targetRole?: string | null
          details?: Json | null
        }
        Update: {
          id?: string
          createdAt?: string
          actorId?: string | null
          actorRole?: string | null
          action?: string | null
          targetId?: string | null
          targetRole?: string | null
          details?: Json | null
        }
      }
      Content: {
        Row: {
          cntnt_id: string
          cntnt_title: string
          cntnt_type: ContentType
          cntnt_value: string | null
          tpc_id: string | null
        }
        Insert: {
          cntnt_id: string
          cntnt_title: string
          cntnt_type: ContentType
          audio_file?: string | null
          pdf_file?: string | null
          vd_link?: string | null
          tpc_id?: string | null
        }
        Update: {
          cntnt_id?: string
          cntnt_title?: string
          cntnt_type?: ContentType
          audio_file?: string | null
          pdf_file?: string | null
          vd_link?: string | null
          tpc_id?: string | null
        }
      }
      Skill: {
        Row: {
          skl_id: string
          skl_title: string
          skl_dscrptn: string
          skl_duration: number
          teacher_id: string | null
        }
        Insert: {
          skl_id?: string
          skl_title: string
          skl_dscrptn: string
          skl_duration: number
          teacher_id?: string | null
        }
        Update: {
          skl_id?: string
          skl_title?: string
          skl_dscrptn?: string
          skl_duration?: number
          teacher_id?: string | null
        }
      }
      Student: {
        Row: {
          std_id: string
          std_fullname: string
          std_email: string
          std_pfp: string | null
          std_streak: number
          std_last_activeDate: string
          std_level: Level
          user_id: string | null
        }
        Insert: {
          std_id: string
          std_fullname: string
          std_email: string
          std_pfp?: string | null
          std_streak?: number
          std_last_activeDate?: string
          std_level?: Level
          user_id?: string | null
        }
        Update: {
          std_id?: string
          std_fullname?: string
          std_email?: string
          std_pfp?: string | null
          std_streak?: number
          std_last_activeDate?: string
          std_level?: Level
          user_id?: string | null
        }
      }
      Teacher: {
        Row: {
          tchr_id: string
          tchr_fullname: string
          tchr_email: string
          tchr_pfp: string | null
          user_id: string | null
        }
        Insert: {
          tchr_id: string
          tchr_fullname: string
          tchr_email: string
          tchr_pfp?: string | null
          user_id?: string | null
        }
        Update: {
          tchr_id?: string
          tchr_fullname?: string
          tchr_email?: string
          tchr_pfp?: string | null
          user_id?: string | null
        }
      }
      Topic: {
        Row: {
          tpc_id: string
          tpc_title: string
          tpc_description: string
          parent_id: string | null
          skill_id: string | null
        }
        Insert: {
          tpc_id: string
          tpc_title: string
          parent_id?: string | null
          skill_id?: string | null
        }
        Update: {
          tpc_id?: string
          tpc_title?: string
          parent_id?: string | null
          skill_id?: string | null
        }
      }
      enroll: {
        Row: {
          studentId: string
          progress: number
          skill_id: string | null
        }
        Insert: {
          studentId: string
          progress: number
          skill_id?: string | null
        }
        Update: {
          studentId?: string
          progress?: number
          skill_id?: string | null
        }
      }
      q_response: {
        Row: {
          rspns_id: string
          response: string
          isCorrect: boolean
          quizId: string
        }
        Insert: {
          rspns_id: string
          response: string
          isCorrect: boolean
          quizId: string
        }
        Update: {
          rspns_id?: string
          response?: string
          isCorrect?: boolean
          quizId?: string
        }
      }
      quiz: {
        Row: {
          qst_id: string
          question: string
          difficulty: Difficulty
          tpc_id: string
        }
        Insert: {
          qst_id: string
          question: string
          difficulty: Difficulty
          tpc_id: string
        }
        Update: {
          qst_id?: string
          question?: string
          difficulty?: Difficulty
          tpc_id?: string
        }
      }
      review: {
        Row: {
          studentId: string
          content_id: string
          comment: string
          rating: number
        }
        Insert: {
          studentId: string
          content_id: string
          comment: string
          rating: number
        }
        Update: {
          studentId?: string
          content_id?: string
          comment?: string
          rating?: number
        }
      }
      score: {
        Row: {
          studentId: string
          score: number
          time_taken: number
          tpc_id: string
        }
        Insert: {
          studentId: string
          score: number
          time_taken: number
          tpc_id: string
        }
        Update: {
          studentId?: string
          score?: number
          time_taken?: number
          tpc_id?: string
        }
      }
      teacher_requests: {
        Row: {
          id: string
          user_id: string
          status: "pending" | "approved" | "rejected"
          cv_url: string | null
          motivation: string | null
          admin_note: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: "pending" | "approved" | "rejected"
          cv_url?: string | null
          motivation?: string | null
          admin_note?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: "pending" | "approved" | "rejected"
          cv_url?: string | null
          motivation?: string | null
          admin_note?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_type: ContentType
      level: Level
      difficulty: Difficulty
    }
  }
}

// Convenience types for each table row
export type AuditLog = Database["public"]["Tables"]["AuditLog"]["Row"]
export type Content = Database["public"]["Tables"]["Content"]["Row"]
export type Skill = Database["public"]["Tables"]["Skill"]["Row"]
export type Student = Database["public"]["Tables"]["Student"]["Row"]
export type Teacher = Database["public"]["Tables"]["Teacher"]["Row"]
export type Topic = Database["public"]["Tables"]["Topic"]["Row"]
export type Enroll = Database["public"]["Tables"]["enroll"]["Row"]
export type QResponse = Database["public"]["Tables"]["q_response"]["Row"]
export type Quiz = Database["public"]["Tables"]["quiz"]["Row"]
export type Review = Database["public"]["Tables"]["review"]["Row"]
export type Score = Database["public"]["Tables"]["score"]["Row"]
export type TeacherRequest = Database["public"]["Tables"]["teacher_requests"]["Row"]
