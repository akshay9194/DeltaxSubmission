USE [deltaX]
GO
/****** Object:  Table [dbo].[Actors]    Script Date: 8/12/2018 1:07:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Actors](
	[ActorId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Sex] [varchar](1) NOT NULL,
	[DOB] [date] NOT NULL,
	[Bio] [varchar](1000) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ActorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MovieProducer]    Script Date: 8/12/2018 1:07:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MovieProducer](
	[MovieId] [int] NOT NULL,
	[ProducerId] [int] NOT NULL,
UNIQUE NONCLUSTERED 
(
	[MovieId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MovieProducerActor]    Script Date: 8/12/2018 1:07:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MovieProducerActor](
	[MovieProducerActor] [int] IDENTITY(1,1) NOT NULL,
	[MovieId] [int] NOT NULL,
	[ActorId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MovieProducerActor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Movies]    Script Date: 8/12/2018 1:07:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movies](
	[MovieId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[YoR] [varchar](4) NOT NULL,
	[Plot] [varchar](1000) NOT NULL,
	[Bio] [varchar](1000) NOT NULL,
	[Poster] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MovieId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producers]    Script Date: 8/12/2018 1:07:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producers](
	[ProducerId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Sex] [varchar](1) NOT NULL,
	[DOB] [date] NOT NULL,
	[Bio] [varchar](1000) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProducerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MovieProducer]  WITH CHECK ADD FOREIGN KEY([MovieId])
REFERENCES [dbo].[Movies] ([MovieId])
GO
ALTER TABLE [dbo].[MovieProducer]  WITH CHECK ADD FOREIGN KEY([ProducerId])
REFERENCES [dbo].[Producers] ([ProducerId])
GO
ALTER TABLE [dbo].[MovieProducerActor]  WITH CHECK ADD FOREIGN KEY([ActorId])
REFERENCES [dbo].[Actors] ([ActorId])
GO
ALTER TABLE [dbo].[MovieProducerActor]  WITH CHECK ADD FOREIGN KEY([MovieId])
REFERENCES [dbo].[Movies] ([MovieId])
GO
/****** Object:  StoredProcedure [dbo].[GetimdbData]    Script Date: 8/12/2018 1:07:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetimdbData]
as
begin

With LinkTable As
(SELECT mp.MovieId, mp.ProducerId, mpa.ActorId from
	   MovieProducer mp
join
	MovieProducerActor mpa 
on mp.MovieId = mpa.MovieId)

select m.MovieId as MovieId ,m.Name as MovieName, m.YoR as YearOfRelease, m.Plot as MoviePlot, 
m.Bio as MovieBio, m.Poster as MoviePoster, act.ActorId as ActorId,
act.Name as ActorName, act.Sex as ActorSex, 
act.DOB as ActorDob, act.Bio as ActorBio,p.ProducerId as ProducerId,
p.Name as ProducerName, p.Sex as ProducerSex, p.DOB as ProducerDob, p.Bio as ProducerBio
from
movies m,actors act, producers p
right join
LinkTable lt
on 
p.producerid = lt.producerid
where
m.movieid = lt.movieid and
act.actorid = lt.actorid

end
GO
