'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

export function TestDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded p-2 hover:bg-gray-200">
        Open Dialog
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-40 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl">Edit contact</Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <XIcon />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
