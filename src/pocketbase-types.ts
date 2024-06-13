/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Contacts = "contacts",
	Events = "events",
	Messages = "messages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ContactsRecord = {
	email?: string
	message?: string
	name?: string
	objet?: string
}

export type EventsRecord = {
	Date_debut?: IsoDateString
	Date_fin?: IsoDateString
	Lieu?: string
	administrateur?: RecordIdString
	current_participants?: number
	nmb_participants?: number
	nom?: string
	sport?: string
}

export type MessagesRecord = {
	author?: RecordIdString
	content?: string
}

export enum UsersFieldOptions {
	"Football" = "Football",
	"Basketball" = "Basketball",
	"Badminton" = "Badminton",
	"Volley" = "Volley",
	"Tennis de table" = "Tennis de table",
	"Paddle" = "Paddle",
	"Tennis" = "Tennis",
	"Pétanque" = "Pétanque",
}

export enum UsersSexeOptions {
	"Homme" = "Homme",
	"Femme" = "Femme",
	"Autre" = "Autre",
}

export enum UsersStatutOptions {
	"Disponible" = "Disponible",
	"Occupé" = "Occupé",
}

export enum UsersObjectifOptions {
	"Fun" = "Fun",
	"Compétitif" = "Compétitif",
}
export type UsersRecord = {
	age?: number
	avatar?: string
	banniere?: string
	bio?: string
	events?: RecordIdString[]
	field?: UsersFieldOptions
	lieu?: string
	name?: string
	objectif?: UsersObjectifOptions
	position?: string
	sexe?: UsersSexeOptions
	statut?: UsersStatutOptions
}

// Response types include system fields and match responses from the PocketBase API
export type ContactsResponse<Texpand = unknown> = Required<ContactsRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	contacts: ContactsRecord
	events: EventsRecord
	messages: MessagesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	contacts: ContactsResponse
	events: EventsResponse
	messages: MessagesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'contacts'): RecordService<ContactsResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'messages'): RecordService<MessagesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
