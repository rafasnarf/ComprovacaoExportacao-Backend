# Controle e Comprovação de Exportação - Backend

------------

#### Para instalar as dependências:
`npm install`

#### Rodando o backend

    # development
    npm start:dev

    # production
    npm build
    npm start

#### Arquivo .env
    # Database Data for TYPEORM configuration

    DB_USER=
    DB_PASS=
    DB_HOST=
    DB_NAME="comprovacao_exportacao"

    # Password for certificates
    CERT_PASS=

#### Arquivo ormconfig.json
    {
      "type": "mysql",
      "host": ,
      "port": 3306,
      "username": ,
      "password": ,
      "database": "comprovacao_exportacao",
      "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
      "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
      "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations",
        "entitiesDir": "./src/modules/**/infra/typeorm/entities/*.ts"
      },
      "autoLoadEntities": true
    }

------------

#### Rotas
##### 	Operations
`GET`- /operations/date

     {
        	query_params:
        		startDate: string
        		finalDate: string
        }

`GET` - /operations/cenop

    {
    	query_params:
    		prefixoCenop: number
    }

`GET` - /operations/nroper

	{
		query_params:
			nrOper: number
	}

`GET` - /operations/mci

	{
		query_params:
		mci: number
	}

`GET` - /operations/cnpj

	{
		query_params:
		cnpj: number
	}

##### DUES

`GET` - /dues

	{
		query_params:
			operation: number
	}

`POST` - /dues



	JSON:{
			nrDue: string;
  			chaveDue: string;
  			valorDue: number;
  			nrOperDue: number;
	}

##### manualConfirmation
`GET` -/manualconfirmation/operation

	{
		query_params:
			nrOper: number
	}

`post` -/manualconfirmation/save

	{
		JSON: {
			nrOper: number;
			prefDepe: number;
			matriculaConfirmacao: string;
			 observacoes?: string;
		}
	}

