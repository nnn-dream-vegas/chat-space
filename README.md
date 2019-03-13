# DB設計

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name  |string|null: false,index: true, unique: true|

### Association
- hasmany :group_user
- has_many :users, through: :group_users
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|string|
|image|string|
|group|references|foreign_key: true|
|user|references|foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user

