﻿using System.Text.Json;
using System.Text.Json.Serialization;

public class DateOnlyConverter : JsonConverter<DateOnly>
{
    private readonly string serializationFormat;

    public DateOnlyConverter() : this(null)
    {
    }

    public DateOnlyConverter(string? serializationFormat)
    {
        this.serializationFormat = serializationFormat ?? "dd.MM.yyyy";
    }

    public override DateOnly Read(ref Utf8JsonReader reader,
                            Type typeToConvert, JsonSerializerOptions options)
    {
        return DateOnly.FromDateTime(reader.GetDateTime());
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value,
                                        JsonSerializerOptions options)
        => writer.WriteStringValue(value.ToString(serializationFormat));
}