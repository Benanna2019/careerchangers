'use client'
import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
import fallbackNetworkingUrl from 'app/hotairballoons.jpg'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'app/components/shadui/ui-comps/dialog'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { usePathname } from 'next/navigation'

import { collectLinkActions, saveGuestbookEntry } from 'app/actions'

export const actionsLookupObject = {
  'collect-link': collectLinkActions,
  'save-guestbook-entry': saveGuestbookEntry,
}

const CustomLink = (props) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Callout(props) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  )
}

function LinkedInCallout(props: LinkedInProps) {
  return (
    <>
      <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
        <h3 className="text-xl uppercase">Linkedin</h3>
        <h2 className="text-2xl">{props.title}</h2>
        <div className="my-6">
          <div className="relative mb-4 h-52">
            <Image
              alt="Me speaking on stage at React Summit about the future of Next.js"
              src="https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlua2VkaW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
          <div className="callout w-full">{props.children}</div>
        </div>
      </div>
    </>
  )
}

function CollectLinkPopUp(props: CollectionLinkPopUpProps) {
  const serverAction = actionsLookupObject[props.serverAction]
  const formRef = React.useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  const pathname = usePathname()
  return (
    <>
      <Dialog>
        <DialogTrigger>{props.title}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.content}</DialogDescription>
            <form
              style={{ opacity: !pending ? 1 : 0.7 }}
              className=" max-w-[500px] text-sm"
              ref={formRef}
              action={async (formData) => {
                await serverAction(formData, pathname)
                formRef.current?.reset()
              }}
            >
              <button type="submit" name="intent" value={props.serverAction}>
                Collect link
              </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

function NetworkingCallout(props: NetworkingProps) {
  return (
    <>
      <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
        <h3 className="text-xl uppercase">Networking</h3>
        <h2 className="text-2xl">{props.title}</h2>
        <div className="my-6">
          <div className="relative mb-4 h-52">
            <Image
              alt="Me speaking on stage at React Summit about the future of Next.js"
              src={props.image || fallbackNetworkingUrl}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
          <div className="callout w-full">{props.children}</div>
        </div>
      </div>
    </>
  )
}

function ProsCard({ title, pros }) {
  return (
    <div className="my-4 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6 dark:border-emerald-900 dark:bg-neutral-900">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConsCard({ title, cons }) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-neutral-50 p-6 dark:border-red-900 dark:bg-neutral-900">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  LinkedInCallout,
  NetworkingCallout,
  CollectLinkPopUp,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <article className="prose prose-quoteless prose-neutral dark:prose-invert">
      <Component components={{ ...components }} />
    </article>
  )
}

interface LinkedInProps {
  title: string
  children: React.ReactNode
  popup?: boolean // need to look up the element type cause it will be link that when clicks opens a modal
  popup_content?: React.ReactNode // this will be the shadui modal
}

interface NetworkingProps {
  title: string
  children: React.ReactNode
  image?: string
  popup?: boolean // need to look up the element type cause it will be link that when clicks opens a modal
  popup_content?: React.ReactNode // this will be the shadui modal
}

type CollectionLinkPopUpProps = {
  title: string
  children?: React.ReactNode
  serverAction: 'collect-link' | 'save-guestbook-entry'
  content: string
}
