"use client"

import React from "react"
import { WaitlistPage } from "@/components/waitlist-page"

export default function PreviewWaitlist() {
  return <WaitlistPage countdownTarget={null} onBypassSuccess={() => {}} />
}
