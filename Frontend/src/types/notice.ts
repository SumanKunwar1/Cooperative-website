export interface Notice {
  id: string
  title: string
  content: string
  date: string
  type: "announcement" | "news" | "circular"
  important: boolean
  documentUrl?: string
  documentType?: "pdf" | "doc" | "docx" | "jpg" | "png"
  status: "published" | "draft" | "archived"
  author: string
  createdAt: string
  updatedAt: string
}

export interface NoticeFormData {
  title: string
  content: string
  type: "announcement" | "news" | "circular"
  important: boolean
  status: "published" | "draft" | "archived"
  author: string
  documentUrl?: string
  documentType?: "pdf" | "doc" | "docx" | "jpg" | "png"
}